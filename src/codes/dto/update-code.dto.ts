import { PartialType } from '@nestjs/swagger';
import { CreateCodeDto } from './create-code.dto';

export class UpdateCodeDto extends PartialType(CreateCodeDto) {
    id_User: string = "default user";  
}
