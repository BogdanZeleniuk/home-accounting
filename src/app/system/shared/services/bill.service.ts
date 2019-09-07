import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi{

	constructor(public http: HttpClient){
		super(http);
	}

	getBill(): Observable<Bill>{
		return this.get('bill');
	}

	getCurrency(): Observable<any>{
		return this.http.get(`http://data.fixer.io/api/latest?access_key=16d7788ad1b6f3319b7a4f90f5ec86d2`);
	}

	updateBill(bill: Bill): Observable<Bill>{
		return this.put('bill', bill);
	}
}