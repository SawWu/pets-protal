<template>
  <div>
    <van-cell-group>
      <van-field
          v-model="userName"
          label="用户名"
          placeholder="请输入用户名"
          required
      />

      <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
      />
    </van-cell-group>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    components: {},
    data: () => ({
      userName: '',
      password: ''
    }),
  }
</script>
