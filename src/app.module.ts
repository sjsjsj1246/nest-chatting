import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';
import * as mongoose from 'mongoose';
import { ChatsGateway } from './chats/chats.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [ChatsGateway],
})
export class AppModule implements NestModule {
  configure() {
    const DEBUG = process.env.NODE_ENV === 'dev' ? true : false;
    mongoose.set('debug', DEBUG);
  }
}
