<template>
    <view class="comment-item" :style="{ paddingLeft: level * 20 + 'px' }">
      <view class="user-info">
        <image :src="comment.userAvatar" class="user-avatar" />
        <text class="user-nickname">{{ comment.userNickname }}</text>
      </view>
      <p>{{ comment.content }}</p>
      <div class="interaction">
        <img :src="comment.likedBy.includes(loggedInUser)? '/static/redaixin.png' : '/static/aixin.png'" alt="点赞"
          @click="likeComment(index)" class="icon" />
        <span>{{ comment.likes }}</span>
        <view v-if="isReplying" class="comment-input">
          <input v-model="newReply" type="text" placeholder="回复评论" ref="replyInput" />
          <!-- 根据输入框内容显示“提交”按钮或“message.png” -->
          <view v-if="newReply.trim()!== ''" @click="addReply(index)" class="submit-button">提交</view>
          <img v-else src="/static/message.png" alt="提交" @click="focusOnReplyInput" class="icon" />
        </view>
        <img v-if="!isReplying" src="/static/message.png" alt="评论" @click="toggleReplyInput" class="icon" />
        <view v-if="isOwner">
          <img src="/static/delete.png" alt="删除" @click="confirmDeleteComment(index)" class="icon">
        </view>
      </div>
      <!-- 子评论列表 -->
      <view v-if="comment.replies.length > 0" class="reply-list">
        <CommentItem v-for="(reply, replyIndex) in comment.replies.slice(0, comment.shownRepliesCount)" :key="replyIndex"
          :comment="reply" :index="replyIndex" :comments="comment.replies" :loggedInUser="loggedInUser"
          :saveComments="saveComments" :fetchUserInfo="fetchUserInfo" :likeComment="likeComment"
          :focusOnReply="focusOnReply" :level="level + 1" :isOwner="reply.userId === loggedInUser"
          :deleteComment="deleteComment"></CommentItem>
        <view v-if="comment.replies.length > comment.shownRepliesCount" class="expand-button"
          @click="toggleExpand(index)">
          <text>{{ comment.showAllReplies? '收起' : '展开' }}</text>
        </view>
      </view>
    </view>
  </template>
  
  <script>
    export default {
      props: {
        comment: {
          type: Object,
          required: true
        },
        index: {
          type: Number,
          required: true
        },
        comments: {
          type: Array,
          required: true
        },
        loggedInUser: {
          type: String,
          required: true
        },
        saveComments: {
          type: Function,
          required: true
        },
        fetchUserInfo: {
          type: Function,
          required: true
        },
        likeComment: {
          type: Function,
          required: true
        },
        focusOnReply: {
          type: Function,
          required: true
        },
        level: {
          type: Number,
          default: 0
        },
        isOwner: {
          type: Boolean,
          default: false
        },
        deleteComment: {
          type: Function,
          required: true
        }
      },
      data() {
        return {
          newReply: '',
          isReplying: false
        };
      },
      methods: {
        async addReply(index) {
          if (this.newReply.trim() !== '') {
            const userInfo = await this.fetchUserInfo(this.loggedInUser);
            this.comments[index].replies.push({
              content: this.newReply,
              likes: 0,
              likedBy: [],
              replies: [],
              userId: this.loggedInUser,
              userAvatar: userInfo.avatar,
              userNickname: userInfo.nickname,
              showAllReplies: false,
              shownRepliesCount: 3
            });
            this.newReply = '';
            this.isReplying = false;
            this.saveComments();
          }
        },
        toggleExpand(index) {
          if (this.comments[index].showAllReplies) {
            this.comments[index].shownRepliesCount = 3;
          } else {
            this.comments[index].shownRepliesCount = Math.min(this.comments[index].replies.length, this.comments[index]
              .shownRepliesCount + 5);
          }
          this.comments[index].showAllReplies = !this.comments[index].showAllReplies;
          this.saveComments();
        },
        toggleReplyInput() {
          this.isReplying = !this.isReplying;
          if (this.isReplying) {
            this.$nextTick(() => {
              this.$refs.replyInput.focus();
            });
          }
        },
        confirmDeleteComment(index) {
          uni.showModal({
            title: '提示',
            content: '是否删除评论？',
            cancelText: '否',
            confirmText: '是',
            success: (res) => {
              if (res.confirm) {
                this.deleteComment(index);
              }
            }
          });
        },
        focusOnReplyInput() {
          this.$refs.replyInput.focus();
        }
      }
    };
  </script>
  
  <style scoped>
    .comment-item {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
  
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
  
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  
    .user-nickname {
      font-size: 14px;
      color: #666;
    }
  
    .interaction {
      text-align: right;
    }
  
    .icon {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      cursor: pointer;
    }
  
    .reply-list {
      margin-top: 10px;
    }
  
    .comment-input {
      margin-top: 10px;
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
  
    .comment-input input {
      flex: 1;
      margin-right: 10px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
    }
  
    .expand-button {
      color: lightblue;
      cursor: pointer;
      margin-top: 5px;
    }
  
    .submit-button {
      background-color: #007aff;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;
    }
  </style>