import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import {
  DownlineTreeviewItem,
  OrderDownlineTreeviewEventParser,
  TreeviewComponent,
  TreeviewConfig,
  TreeviewEventParser,
  TreeviewHelper,
  TreeviewItem
} from 'ngx-treeview';
import { ProductService } from '../service/product.service.service';

@Injectable()
export class ProductTreeViewConfig extends TreeviewConfig {
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = 400;
}

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  providers: [
    ProductService,
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ProductTreeViewConfig }
  ]
})
export class ProductComponent implements OnInit {
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  items: TreeviewItem[];
  rows: string[];
  
  constructor(private service: ProductService) {
  }
  
  ngOnInit() {
    this.items = this.service.getProducts();
  }
  
  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.rows = [];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!_.isNil(parent)) {
        texts.push(parent.item.text);
        parent = parent.parent;
      }
      const reverseTexts = _.reverse(texts);
      const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.rows.push(row);
    });
  }
  
  removeItem(item: TreeviewItem) {
    let isRemoved = false;
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        _.remove(this.items, item);
      } else {
        isRemoved = TreeviewHelper.removeItem(tmpItem, item);
        if (isRemoved) {
          break;
        }
      }
    }
    
    if (isRemoved) {
      this.treeviewComponent.raiseSelectedChange();
    }
  }
}