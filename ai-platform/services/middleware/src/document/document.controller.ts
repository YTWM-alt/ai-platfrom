import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.processDocument(file);
  }

  @Get()
  async getAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  @Get(':id')
  async getDocument(@Param('id') id: string) {
    return this.documentService.getDocument(id);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return this.documentService.deleteDocument(id);
  }

  @Get(':id/chunks')
  async getDocumentChunks(@Param('id') id: string) {
    return this.documentService.getDocumentChunks(id);
  }
}
