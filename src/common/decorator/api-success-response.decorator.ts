import { applyDecorators, HttpCode, Type } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseEntity } from '../response/ResponseEntity';

// eslint-disable-next-line @typescript-eslint/ban-types
export function ApiSuccessResponse(status: number, data?: Type<unknown> | Function | [Function] | string) {
  class Temp extends ResponseEntity<any> {
    @ApiProperty({ type: data })
    get data() {
      return super.data;
    }
  }
  return applyDecorators(HttpCode(status), ApiResponse({ type: Temp, status }));
}
