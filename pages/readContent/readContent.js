// pages/readContent/readContent.js
import {
  fetch
} from "../../utils/util.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: "",
    article: {},
    title:"",
    isLoading: false,
    catalog:[],
    isShow:false,
    bookId:""
  },


  onLoad: function(options) {

    console.log(options)

    this.setData({
      articleId: options.id,
      isLoading: true,
      bookId:options.bookId,
    })
    this.getData();
    this.getCatalog();
  },

  //请求markdown文件，并转换为内容

  getData() {
    fetch.get(`/article/${this.data.articleId}`).then(res => {
      console.log(res.data.data);
      let articledata = app.towxml.toJson(res.data.data.article.content, 'markdown');
      this.setData({
        article: articledata,
        title:res.data.data.title,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res.data.data)
      this.setData({
        catalog:res.data.data
      })
    })
  },
  toggleCatalog(){
    let isShow = !this.data.isShow;
    this.setData({
        isShow
    })
  },
  handleGet(e){
    console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id;
    this.setData({
      articleId:id,
      isShow:!this.data.isShow
    })
    this.getData()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})