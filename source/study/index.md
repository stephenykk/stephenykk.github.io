---
title: study
date: 2024-09-05 08:18:03
tags: 
 - student
category: student
---



# 一起学认字

<style>
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    .card {
        width: 200px;
        height: 300px;
        background-color: #f0f0f0;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

<div class="app" id="app">
    <section class="actions-container">
        <div class="actions">
            <button>管理文字表</button>
            <button>单字练习</button>
            <button>多字练习</button>
        </div>
    </section>
    <section class="admin-container">
        <div class="admin">
            <ul>
               <li v-for="(item, index) in wordList" :key="item">
               <div>{{ index + 1 }}</div>
               <div>{{ item }}</div>
               </li>
            </ul>
            <input type="text" v-model="newWord">
            <button @click="addWord">添加</button>
        </div>
    </section>
    <section class="card-container">
        <div class="card" v-for="item in words" :key="item">
            <div class="card-content">
                <div class="card-title">{{ item }}</div>
        </div>
    </section>
    <section class="card-container">
        <div class="card">
            <div class="card-content">
                <div class="card-title">汉字</div>
                <div class="card-text">汉字，又称中文字、汉字，是汉字文化圈中使用的文字，也是世界上最古老的文字之一。汉字起源于商朝，经过数千年的演变，形成了今天我们所熟知的汉字体系。汉字是一种象形文字，每个汉字都代表一个特定的意义，通过组合和变化，可以表达丰富的思想和情感。</div>
            </div>
        </div>
    </section>    
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            showAdmin: false,
            showCard: true,
            newWord: '',
            wordList: ['天', '下']
        },
        methods: {
            toggleAdmin() {
                this.showAdmin = !this.showAdmin;
                this.showCard = !this.showCard;
            }
        }
    });
</script>