<template>
    <div class="user-profile">
        <div class="user-profile__sidebar">
            <div class="user-profile__user-panel">
                <h1 class="user-profile__username">@{{ state.user.username }}</h1>
                <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
                    Admin
                </div>
                <div class="user-profile__follower-count">
                    <strong>Followers: </strong> {{ state.followers }}
                </div>
            </div>
            <CreateTwootPanel @add-twoot="addTwoot"/>
        </div>
        <div class="user-profile__twoots-wrapper">
            <TwootItem 
                v-for="twoot in state.user.twoots" 
                :key="twoot.id" 
                :username="state.user.username" 
                :twoot="twoot" 
                @favourite="toggleFavourite"
            />
        </div>
    </div>
</template>

<script>
import { reactive, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { users } from "../assets/users"
import TwootItem from '../components/TwootItem';
import CreateTwootPanel from '../components/CreateTwootPanel';

export default {
    name: "UserProfile",
    components: {
        TwootItem,
        CreateTwootPanel
    },
    setup() {
        const route = useRoute();
        const userId = computed(() => route.params.userId);
        
        const state = reactive({
            followers: 0,
            // user: users[userId] || null
            user: users[userId.value - 1] || users[0]

            // user: {
            //     id: 1,
            //     username: '_MitchellRomney',
            //     firstName: 'Mitchell',
            //     lastName: 'Romney',
            //     email: 'mitchellromney@theearthissquare.com',
            //     isAdmin: true,
            //     twoots: [
            //         { id: 1, content: 'Twotter is Amazing!'},
            //         { id: 2, content: "Don't forget to subscribe to The Earth is Square!"},
            //         { id: 3, content: "Please like my Page!"},
            //     ]
            // }
        })

        function addTwoot(twoot) {
            state.user.twoots.unshift({
                id: state.user.twoots.length + 1,
                content: twoot
            });
        }

        function toggleFavourite(id) {
            console.log(`Favourited twoot #${id}`);
        }

        function followUser() {
            state.followers++
        }

        watch(() => state.followers, 
            (followerCount, oldFollowerCount) => {
            if (oldFollowerCount < followerCount) {
                console.log(`${state.user.username} has gained a follower!`);
            }
        })

        onMounted(() => {
            followUser();
        })

        return {
            state,
            addTwoot,
            toggleFavourite,
            followUser,
            userId
        }
    },

    // data() {
    //     return {
    //         followers: 0,
    //         user: {
    //             id: 1,
    //             username: '_MitchellRomney',
    //             firstName: 'Mitchell',
    //             lastName: 'Romney',
    //             email: 'mitchellromney@theearthissquare.com',
    //             isAdmin: true,
    //             twoots: [
    //                 { id: 1, content: 'Twotter is Amazing!'},
    //                 { id: 2, content: "Don't forget to subscribe to The Earth is Square!"},
    //                 { id: 3, content: "Please like my Page!"},
    //             ]
    //         }
    //     }
    // },
    // watch: {
    //     followers(newFollowerCount, oldFollowerCount) {
    //         if (oldFollowerCount < newFollowerCount) {
    //             console.log(`${this.user.username} has gained a follower!`);
    //         }
    //     }
    // },
    // computed: {
    //     // fullName() {
    //     //     return `${this.user.firstName} ${this.user.lastName}`;
    //     // }
    //     newTwootCharacterCount() {
    //         return this.newTwootContent.length;
    //     }
    // },

    // methods: {
    //     followUser() {
    //         this.followers++
    //     },
    //     toggleFavourite(id) {
    //         console.log(`Favourited twoot #${id}`);
    //     },
    //     addTwoot(twoot) {
    //         this.user.twoots.unshift({
    //             id: this.user.twoots.length + 1,
    //             content: twoot
    //         });
    //     }
    // },
    // mounted() {
    //     this.followUser();
    // }
}
</script>

<style lang="scss" scoped>
    .user-profile {
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: 100%;
        padding: 50px 5%;

        .user-profile__sidebar {
            margin-right: 50px;
            .user-profile__user-panel  {
            display: flex;
            flex-direction: column;
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            border: 1px solid #DFE3E8;
            margin-bottom: auto;

            h1 {
                margin: 0;
            }

            .user-profile__admin-badge {
                background: rebeccapurple;
                color: white;
                border-radius: 5px;
                margin-right: auto;
                padding: 0 10px;
                font-weight: bold;
            }
        }
        }
       

        .user-profile__twoots-wrapper {
            display: grid;
            grid-gap: 10px;
            margin-bottom: auto;
        }
    }
</style>