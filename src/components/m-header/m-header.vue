<template>
    <div class='m-header'>
        <div class='icon'></div>
        <div class='name'>Chicken Music</div>
        <div class="mine">
            <i class='icon-mine'></i>
        </div>
        
    </div>
</template>
<script>
export default{

}
</script>
<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.m-header{
    position: relative;
    height: 44px;
    text-align: center;
    color: $color-theme;
    .icon{
        display: inline-block;
        width: 30px;
        height: 32px;
        @include bg-image('logo');
        background-size: 30px 32px;
        vertical-align: top;
        margin-top: 6px;
        margin-right:9px;
    }
    .name{
        display: inline-block;
        line-height: 44px;
        font-size: $font-size-large;
    }
    .mine{
        position: absolute;
        top: 0;
        right: 0;
        .icon-mine{
            display: block;
            color: $color-theme;
            padding: 12px;
            font-size: 20px;
        }
    }
}

</style>