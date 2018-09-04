// pages/detail/detail.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookContent:{},
    isLoading: false
  },

  onLoad: function (options) {
   console.log(options)
   this.setData({
     bookId:options.id,
     isLoading:true
   })
   this.getdata();
  },
  //拿到这本书的数据
  getdata(){
    fetch.get(`/book/${this.data.bookId}`).then(res =>{
      console.log(res.data.data)
      this.setData({
        bookContent:res.data.data,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })

  },
  jumpRead(event){
    console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/menu/menu?id=${id}`,
      // success: function(res) {},
      // fail: function(res) {},
      // complete: function(res) {},
    })
  },
  onShareAppMessage: function () {
  
  }
})