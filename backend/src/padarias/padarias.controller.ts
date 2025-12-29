import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PadariasService } from './padarias.service';
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';
import { FuncaoUsuario } from '../usuarios/usuario.entity';
import { CriarPadariaDto } from './dto/criar-padaria.dto';
import { AtualizarConfiguracoesDto } from './dto/atualizar-configuracoes.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Controller('padarias')
export class PadariasController {
  constructor(private readonly padariasService: PadariasService) {}

  @Get()
  listarTodas() {
    return this.padariasService.listarTodas();
  }

  // Rota para o Dono buscar os dados da própria padaria no Config.html
  @Get('minha-padaria')
  @UseGuards(AuthGuard('jwt'))
  buscarMinhaPadaria(@Req() req: any) {
    return this.padariasService.buscarPorDono(req.user.userId);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.padariasService.buscarPorId(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  criar(
    @Body() dados: CriarPadariaDto,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    return this.padariasService.criar(dados, donoId);
  }

  @Patch('configuracoes')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  atualizarConfiguracoes(
    @Body() dados: AtualizarConfiguracoesDto,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    return this.padariasService.atualizarConfiguracoes(donoId, dados);
  }

  @Post('logo')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @UploadedFile() file: any,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    if (!file) return { message: 'Nenhum arquivo enviado' };

    const root = 'uploads/logos';
    if (!existsSync(root)) mkdirSync(root, { recursive: true });

    const ext = (() => {
      const map: Record<string, string> = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/webp': '.webp',
      };
      return map[file.mimetype ?? ''] ?? '.png';
    })();

    const name = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2) + ext;
    const fullPath = join(root, name);
    
    writeFileSync(fullPath, file.buffer);
    
    const relativePath = `logos/${name}`; // Caminho amigável para o front
    return this.padariasService.atualizarLogo(donoId, relativePath);
  }
}