import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Virag } from './virag.js';
import { CreateViragDto } from './createvirag.dto.js';
import { error } from 'console';

@Controller()
export class AppController {

    viragok: Virag[] = [
      {
        fajta: 'Rózsa',
        szin: 'piros',
        ar: 790
      },
      {
        fajta: 'Tulipán',
        szin: 'sárga',
        ar: 580
      }
    ]

    @Get('ujvirag')
    @Render('ujviragform')
    ujviragform(){
      return{
        viragok: this.viragok
      }
    }

    @Post('ujvirag')
    @Render('ujviragform')
    ujVirag(@Body() body: CreateViragDto){
      if(!body.fajta)
      {
        return{
          viragok: this.viragok,
          error: 'A fajtát kötelező megaddni'
        }
      }

      if(!['piros', 'sárga', 'fehér'].includes(body.szin))
      {
        return{
          viragok: this.viragok,
          error: 'A fajtát kötelező megaddnÉrvénytelen szín'
        }
      }

      const ar = Number(body.ar)
      if(!ar || isNaN(ar) || ar <= 0)
      {
        return{
          viragok: this.viragok,
          error: 'Az ár csak pozitív egész szám lehet'
        }
      }
      
      const ujVirag: Virag = {
        fajta: body.fajta,
        szin: body.szin,
        ar: Number(body.ar)
      }
      this.viragok.push(ujVirag)

      return{
        viragok: this.viragok
      }
    }

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Virágok',
    }
  }
}
