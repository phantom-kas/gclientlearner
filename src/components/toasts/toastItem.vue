<script setup lang="ts">
import { onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineProps({
    msg: String,
    status: {
        type: String,
        default: 'success'
    }
})

onMounted(() => {
    setTimeout(() => emit('remove'), 10000)
});

const emit = defineEmits(['remove'])
</script>

<template>
    <div :class="[status, 'color_' + status]" class='toast bgmute sdw1'>
        <div class='fss v-flex c-c round'>
            <!-- <i class = 'fa'></i> -->
            <font-awesome-icon v-if="status == 'info'" class='info color_info swd1' :icon="['fas', 'circle-info']"
                size="2xl" />
            <font-awesome-icon v-else-if="status == 'warning'" class='warning color_warning'
                :icon="['fas', 'triangle-exclamation']" size="2xl" />
            <font-awesome-icon v-else-if="status == 'success'" class='success color_success'
                :icon="['far', 'circle-check']" size="2xl" />
            <font-awesome-icon v-else-if="status == 'error'" class='error color_error swd1'
                :icon="['fas', 'circle-xmark']" size="2xl" />
        </div>

        <div class='fg  message leading-4' v-html="msg">

        </div>
        <div class=" ml-auto">
            <!-- <i   class = 'fa fa-times'></i> -->

            <font-awesome-icon @click="emit('remove')" :icon="['fas', 'xmark']" />
        </div>

        <span class='ld_prog'></span>
    </div>
</template>
<style scoped>
.toast {
    --error_color: rgb(234, 36, 36);
    --success_color: rgb(63, 172, 63);
    --warning_color: #ef9400c4;
    --info_color: rgb(77, 77, 242);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 200;
    -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    gap: 1rem;
    padding: 0.3rem 0.7rem;
    border-radius: 0.3rem;
    position: relative;
    color: white;
}

.toast.warning {
    border-left: 8px double var(--warning_color);
}

.message {
    /* color: var(--color); */
}

div {
    margin-bottom: 0.5rem;
}

.success {
    /* color: white;
  background: rgb(63, 172, 63); */
    background-color: rgb(63, 172, 63);

}

.success>div>:first-child::after {
    content: "";
    color: greed;
    background: rgb(63, 172, 63);
}

.info {
    /* color: white;
  background: var(--info_color); */
}

.error {

    background-color: var(--error_color);

}

.error>div:first-child>i::before {
    content: "\f00d"
}

.msg {}

.warning {
    background-color: var(--warning_color);
}

.warning>div:first-child>i::before {
    content: "\f071"
}

.warning {}

.info {}

.success>div:first-child>i::before {
    content: "\f00c";
    color: #ef9400c4;
}
/* 
.success>.ld_prog {
    background: var(--success_color);
}

.warning>.ld_prog {
    background: #ef94007c;
}

.info>.ld_prog {
    background: var(--info_color);
}

.error>.ld_prog {
    background: var(--error_color);
}

.ld_prog {
    width: 100%;
    position: absolute;
    bottom: -6px;
    right: 0;
    height: 5px;
    animation: slideInFromLeft 13s;
}

@keyframes slideInFromLeft {
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
} */

</style>