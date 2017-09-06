import EditComponent from './components/edit'

export default {
    name: '采招详情',

    // 预览区域默认数据
    previewData: {
        props: {
          apiUrl: '/mock-detail'
        }
    },

    ctrl: {
        component: EditComponent
    }
}