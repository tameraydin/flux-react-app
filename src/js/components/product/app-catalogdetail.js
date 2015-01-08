/** @jsx React.DOM */
'use strict';
var React = require('react'),
    AddToCart = require('../catalog/app-addtocart.js'),
    Link = require('react-router-component').Link,
    AppStore = require('../../stores/app-store.js'),
    StoreWatchMixin = require('../../mixins/StoreWatchMixin');


function getCatalogItem(component){
  var thisItem;
  AppStore.getCatalog().forEach(function(item){
    if(item.id.toString()===component.props.item)  {thisItem = item;}
  });
  return {item: thisItem};
}

var CatalogDetail =
  React.createClass({
    mixins: [new StoreWatchMixin(getCatalogItem)],
    render:function(){
      return (
          <div>
            <h2>{this.state.item.title}</h2>
            <img src={this.state.item.img} alt="" />
            <p>{this.state.item.description}</p>
            <p>${this.state.item.cost} <span className="text-success">{this.state.item.inCart && '(' + this.state.item.qty + ' in cart)'}</span></p>
            <div className="btn-group btn-group-sm">
              <AddToCart item={this.state.item} />
              <Link href={'/'} className="btn btn-default">Continue Shopping</Link>
            </div>
          </div>
        )
    }
  });

module.exports = CatalogDetail;
