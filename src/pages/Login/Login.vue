<template>
  <div class="login_warp flex justify-center items-center">
    <div class="login_area">
      <div class="title">RABBIT API</div>
      <a-form :rules="rules" ref="formRef" :model="userInput">
        <!-- 账号 -->
        <a-form-item name="id" class="mb-10px">
          <a-input
            v-model:value="userInput.id"
            placeholder="请输入账号"
            :disabled="loading"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <!-- 密码 -->
        <a-form-item name="password">
          <a-input-password
            v-model:value="userInput.password"
            placeholder="请输入密码"
            :disabled="loading"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- 登录 -->
        <a-form-item>
          <a-button
            :loading="loading"
            class="w-full mt-10px"
            type="primary"
            @click="on_submit"
            >登 录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { loading, userInput, rules } from './hooks/useForm'
const formRef = ref()

// 校验表单
const check_form = async () => {
  try {
    await formRef.value.validate()
    return true
  } catch (error) {
    window.$message.error('账号密码必填')
    return false
  }
}

// 提交表单
const on_submit = async () => {
  console.log(await check_form())
}
</script>
<style lang="less" scoped>
.login_warp {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  .title {
    font-size: 30px !important;
    text-align: center;
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: bold;
    color: #545456;
  }
  .login_area {
    width: 100%;
    max-width: 600px;
    padding: 0px 10px;
  }
}
</style>
