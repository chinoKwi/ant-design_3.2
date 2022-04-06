import { ref, reactive, UnwrapRef } from 'vue'
import { IuserInput } from '@/types/pages/Login'

export const loading = ref(false)
export const userInput: UnwrapRef<IuserInput> = reactive({
  id: '',
  password: ''
})

export const rules = {
  id: [{ required: true, message: '请填写账号', trigger: 'blur' }],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
}
