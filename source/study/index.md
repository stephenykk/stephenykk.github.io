---
title: 小学堂
date: 2024-09-05 08:18:03
tags:
    - student
category: student
---

<link rel="stylesheet" href="./study.css" />
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="./study.js"></script>

<div class="app" id="app">
    <section class="actions-container">
        <div class="actions ">
            <div class="row flex-row flex-wrap ml-20">
                <label for="userSelect fw-400" style="color:#117993">切换用户: </label>
                <select name="userSelect" id="userSelect"  class="f18 title-select" v-model="currentUser" @change="changeCurrentUser">
                    <option value="">默认用户</option>
                    <option v-for="(user, i) in userList" :value="user.name" :key="i">${user.name}</option>
                </select>
                <button class="action-btn primary flex0 hide" @click="changeCurrentUser">
                    切换用户
                </button>
            </div>
            <hr class="mt-20 mb-20" />
            <div class="row flex-row flex-wrap gap0">
                <button class="action-btn flex0">
                    <a href="admin-users.html">管理用户</a>
                </button>
                <div class="grey ml-10">支持多用户, 每个用户有自己的字库、词语库和标签, 默认模式为单用户, 默认模式下用户名称为空</div>
            </div>
            <hr class="mt-20 mb-20" />
            <div class="row flex-row flex-wrap gap0">
                <button class="action-btn flex0">
                    <a href="admin-tags.html">管理当前用户标签</a>
                </button>
                <div class="grey ml-10">每个用户可为字/词设置标签，并使用标签进行过滤</div>
            </div>
            <hr class="mt-20 mb-20" />
            <div class="row flex-row flex-wrap">
                <button class="action-btn flex0">
                    <a href="admin-single.html">管理文字</a>
                </button>
                <button class="action-btn primary flex0">
                    <a href="single.html">单字练习</a>
                </button>
                <button class="action-btn primary flex0">
                    <a href="single.html?test=1">单字默写</a>
                </button>
            </div>
            <hr class="mt-20 mb-20" />
            <div class="row flex-row flex-wrap">
                <button class="action-btn flex0">
                    <a href="admin-multiple.html">管理词语</a>
                </button>
                <button class="action-btn primary flex0">
                    <a href="multiple.html">词语练习</a>
                </button>
                <button class="action-btn primary flex0">
                    <a href="multiple.html?test=1">词语默写</a>
                </button>
            </div>
        </div>
    </section>
</div>


<script>
    new Vue({
        el: '#app',
        delimiters: ['${', '}'],
        data: {
            currentUser: getCurUser(),
            userList: (LCache.get('users') || []).filter(user => user.status !== 'disable')
        },
        methods: {
            changeCurrentUser() {
                LCache.set('curUser', this.currentUser);
                showToast(`修改成功，当前用户是 ${this.currentUser || '默认用户'}`)
            },
        }
    });
</script>
