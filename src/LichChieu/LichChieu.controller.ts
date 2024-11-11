import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { LichChieuService } from "./LichChieu.service";
import { Response } from "express";
import { LichChieuDto } from "./dto/LichChieu.dto";
import { TaoLichChieuDto } from "./dto/TaoLichChieu.dto";

@ApiTags("QuanLyDatVe")
@Controller("QuanLyDatVe")
export class LichChieuController{
    constructor(
        private readonly lichChieuService:LichChieuService
    ){}
    
    //API lay danh sach phong ve
    @Get("/LayDanhSachPhongVe")
    @ApiQuery({name:"maLichChieu",required:true,type:Number})
    async LayDanhSachPhongVe(
        @Query('maLichChieu') maLichChieu:number,
        @Res() res:Response<LichChieuDto>
    ):Promise<Response<LichChieuDto>>{
        const formatMaLichChieu = maLichChieu? Number(maLichChieu):1;
        let lichChieuRecord= await this.lichChieuService.LayDanhSachPhongVe(formatMaLichChieu);
        return res.status(HttpStatus.OK).json(lichChieuRecord);
    }

    //API tao lich chieu
    @Post("/TaoLichChieu")
    async TaoLichChieu(
        @Body() taoLichChieuDto:TaoLichChieuDto,
        @Res() res:Response<TaoLichChieuDto>
    ):Promise<Response<TaoLichChieuDto>>{
        let newLichChieuRecord = await this.lichChieuService.TaoLichChieu(taoLichChieuDto);
        return res.status(HttpStatus.CREATED).json(newLichChieuRecord);
    }
}