<template>
    <div>
        <div class="row">
            <div class="input-field col s6">
                <input id="icon_prefix" type="text" v-model="textSearch">
                <label for="icon_prefix">Search</label>
                <input class="btn" type="button" value="Search" v-on:click="search">
            </div>
        </div>
        <ul class="collection">
            <li v-for="user in users" :key="user.id" class="collection-item avatar">
                <img v-bind:src=user.avatar alt="" class="circle">
                <span class="title">{{user.email}}</span>
                <p>{{user.first_name}}<br>
                    {{user.last_name}}
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
        </ul>
    </div>
    
</template>
<script>
    import M from 'materialize-css'
    import axios from 'axios'
    export default {
        name: 'Users',
        data () {
            return {
                textSearch:'',
                users:[]
            }
        },
        mounted: function(){
            this.$nextTick(async function(){
                let res = await axios.get(`http://localhost:3000/api/users/get`)
                this.users = res.data.users
            })
        },
        methods:{
            async search(e){
                let params = this.textSearch.split(' ')
                let res = await axios.get(`http://localhost:3000/api/users/get?${new URLSearchParams({
                                    first_name: params[0],
                                    last_name: params[1]
                                })}`
                )
                this.users = res.data.users
                console.log(res)
            }
        }
    }
</script>