---
title: study
date: 2024-09-05 08:18:03
tags: 
 - student
category: student
---



# 一起学认字

<link rel="stylesheet" href="./study.css" />
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

<div class="app" id="app">
    <a href="./singleWord.html">single world</a>
    <a href="./multipleWorld.html">multiple world</a>
    <section class="actions-container">
        <div class="actions">
            <button class="action-btn">管理文字表</button>
            <button class="action-btn">单字练习</button>
            <button class="action-btn">多字练习</button>
        </div>
    </section>
    <section class="admin-container">
        <div class="admin">
            <ul>
               <li v-for="(item, index) in wordList" :key="item" class="word-item">
               <div class="sn flex0">${ index + 1 }</div>
               <div class="word flex1">${ item }</div>
               <div><button v-on:click="rmWord(index)">删除</button></div>
               </li>
            </ul>
            <input type="text" v-model="newWord">
            <button v-on:click="addWord">添加</button>
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
        delimiters: ['${', '}'],
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
            },
            addWord() {
                if (this.newWord.trim()) {
                    this.wordList.push(this.newWord);
                    this.newWord = '';
                }
            },
            rmWord(index) {
                this.wordList.splice(index, 1);
            }
        }
    });
</script>

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