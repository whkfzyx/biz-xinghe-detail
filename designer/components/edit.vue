<template>
  <el-form :model="form"
           label-width="90px">
    <el-form-item label="接口地址">
      <el-input :value="form.props.apiUrl"
                @change="changeApiUrl"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from 'vue'
import Form from 'element-ui/lib/form'
import FormItem from 'element-ui/lib/form-item'
import Input from 'element-ui/lib/input'

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)

export default {
  props: {
    value: Object
  },
  data () {
    let form = this.value.props
    return {
      form: {
        props: {
          apiUrl: form && form.apiUrl
        }
      }
    }
  },
  watch: {
    value () {
      let form = this.value.props
      this.form.props.apiUrl = form && form.apiUrl
    }
  },
  methods: {
    changeApiUrl (url) {
      this.form.props.apiUrl = url
      this.$emit('onupdate', this.form)
    }
  }
}
</script>
