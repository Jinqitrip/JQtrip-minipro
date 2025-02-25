"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      searchText: "",
      postList: [],
      isHovering: []
    };
  },
  onLoad() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      common_vendor.index.request({
        url: "",
        method: "",
        success: (res) => {
          if (res.statusCode === 200) {
            this.postList = res.data;
            this.isHovering = new Array(this.postList.length).fill(false);
          } else {
            common_vendor.index.showToast({
              title: "获取数据失败",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "网络请求失败，请检查网络",
            icon: "none"
          });
        }
      });
    },
    handleMouseEnter(index = null) {
      this.isHovering[index] = true;
    },
    handleMouseLeave(index = null) {
      this.isHovering[index] = false;
    }
  }
});
if (!Array) {
  const _component_PostItem = common_vendor.resolveComponent("PostItem");
  _component_PostItem();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.searchText,
    c: common_vendor.o(($event) => $data.searchText = $event.detail.value),
    d: common_assets._imports_1,
    e: common_vendor.f($data.postList, (post, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.handleMouseEnter(index), index),
        c: common_vendor.o(($event) => $options.handleMouseLeave(index), index),
        d: "4292d04b-0-" + i0,
        e: common_vendor.p({
          postData: post,
          isHovering: $data.isHovering[index]
        })
      };
    }),
    f: common_vendor.sei(_ctx.virtualHostId, "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
