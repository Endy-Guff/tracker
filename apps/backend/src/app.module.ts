import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GroupsModule,
    NotesModule,
  ],
})
export class AppModule {}
