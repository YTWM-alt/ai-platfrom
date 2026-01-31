import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DocumentModule } from './document/document.module';
import { IndexModule } from './index/index.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DocumentModule,
    IndexModule,
    StorageModule,
  ],
})
export class AppModule {}
