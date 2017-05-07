// pages/read/read.js
let api = require('../../api/api.js');
let util = require('../../util/util.js');

Page({
  data: {
    carousel: [],
    articles: {},
    current: 0
  },
  // 页面加载
  onLoad: function (options) {
    api.getReadingCarousel({
      success:  (res) => {
        if (res.data.res === 0) {
          let carousel = res.data.data;
          this.setData({ carousel });
        }
      }
    });

    api.getReadingIndex({
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data;

          articles.essay.map((essay) => {
            essay.hp_makettime = util.formatBeforeTime(essay.hp_makettime);
          });
          articles.serial.map((serial) => {
            serial.maketime = util.formatBeforeTime(serial.maketime);
          });
          articles.question.map((question) => {
            question.question_makettime = util.formatBeforeTime(question.question_makettime);
          });
          this.setData({ articles });
        } 
      }
    });
  },
  // 滑块页面详情
  viewCarouselDetailTap: function (event) {
    let carouselId = event.currentTarget.dataset.carouselId;
    wx.navigateTo({
      url: 'carousel/carousel?id=' + carouselId
    });
  },
  // 跳转Essay详情
  viewEssayTap: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'essay/essay?id=' + id
    });
  },
  // 跳转Serial详情
  viewSerialTap: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'serial/serial?id=' + id
    });
  },
  // 跳转Question详情
  viewQuestionTap: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'question/question?id=' + id
    });
  }
})