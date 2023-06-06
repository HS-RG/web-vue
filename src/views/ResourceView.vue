<template>
    <div>
        <!-- 论坛文字 -->
        <h1>{{ forumTitle }}</h1>
        <p>{{ forumContent }}</p>

        <!-- 论坛图片 -->
        <img :src="forumImage" alt="Forum Image" />

        <!-- 评论列表 -->
        <div>
            <h2>评论列表</h2>
            <ul>
                <li v-for="comment in comments" :key="comment.id">
                    <strong>{{ comment.author }}</strong>: {{ comment.content }}
                </li>
            </ul>
        </div>

        <!-- 发表评论表单 -->
        <form @submit.prevent="addComment">
            <h2>发表评论</h2>
            <div>
                <label for="author">作者：</label>
                <input type="text" id="author" v-model="newComment.author" required />
            </div>
            <div>
                <label for="content">内容：</label>
                <textarea id="content" v-model="newComment.content" required></textarea>
            </div>
            <button type="submit">发表评论</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {

        return {
            forumTitle: "论坛标题",
            forumContent: "论坛内容",
            forumImage: "https://i.postimg.cc/W3wk2wyz/image.png",
            comments: [
                { id: 1, author: "评论者1", content: "评论内容1" },
                { id: 2, author: "评论者2", content: "评论内容2" },
            ],
            newComment: {
                author: "",
                content: "",
            },
        };
    },
    methods: {
        addComment() {
            // 生成唯一ID，可使用uuid等库
            const newCommentId = Date.now();

            // 将新评论添加到评论列表
            this.comments.push({
                id: newCommentId,
                author: this.newComment.author,
                content: this.newComment.content,
            });

            // 清空发表评论表单
            this.newComment.author = "";
            this.newComment.content = "";
        },
    },
};
</script>
