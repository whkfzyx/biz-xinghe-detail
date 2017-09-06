<template>
  <div class="xinghe-detail">
    <div class="detail-title">{{page.title}}</div>
    <div :class="['detail-date', !datePast || 'detail-past']"
         v-if="page.date || false">有效期至：{{dateComp}}
      <span v-if="datePast">已截止</span>
    </div>
    <pre class="detail-cont">{{page.content}}</pre>
  </div>
</template>

<script>
import mock from '../mock'
import Axios from 'axios'
import { dateFormat } from 'vux'

export default {
  props: {
    designtime: Boolean,
    apiUrl: {
      type: String,
      default: '/mock-detail'
    }
  },
  data () {
    return {
      page: this.designtime ? {
        guid: 'guid-04',
        title: '常州星河国际四期七区八区三网合一工程采购',
        date: 1509944679079,
        content: '相关工作内容：\n一、在机房内设置、安装防雷接地系统，并确保通过验收；对机房进行必要装修，使其符合验收的要求，内容包括：敷设地砖、墙面刷漆、敷设强、弱电线槽等（以验收合格为标准）；机房内的设备要进行合理的布局及摆放。\n二、机房内及机房至住户户内的设备采购与安装，包括：\n1）局端配线设施：光配线架等。\n2）各级主段与分段光缆。\n三、数字电视网的所有工作内容不在本次招标范围内。\n四、技术标回标内容包括但不限于：\n1、本工程设计方案、系统图；设计方案必须通过常州市通讯行业协会的审核，并保证按此方案实施能通过常州市通讯行业协会验收；2、本工程的质量目标、安全目标、现场安全文明、施工工期3、项目部署或思路、与总包配合、协调；4、关键部位施工方案技术措施、质量保证措施、进度保证措施、安全文明措施、环境保护措施、成品保护措施；5、管理组织结构、施工组织设计、服务承诺或保修等。'
      } : {
        title: '',
        date: 0,
        content: ''
      }
    }
  },
  computed: {
    dateComp () {
      return dateFormat(new Date(this.page.date), 'YYYY-MM-DD')
    },
    datePast () {
      const now = Number(new Date)
      return this.page.date < now
    }
  },
  methods: {
    fetch (params) {
      Axios.post(this.apiUrl, params).then((res) => {
        this.page = res.data.result
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    const query = this.$route.query
    this.designtime || this.fetch(query.guid)
  }
}
</script>

<style scoped lang="less">
.xinghe-detail {
  padding: 15px;
  height: 100%;
  width: 100%;
  background-color: #fff;
  overflow-y: scroll;
}

.detail-title {
  font-size: 18px;
}

.detail-date {
  font-size: 14px;
  margin: 20px 0;
  color: #DC220B;
  &.detail-past {
    color: #222;
  }
  span {
    margin-left: 15px;
  }
}

.detail-cont {
  font-size: 14px;
  white-space: pre-wrap;
  /* css-3 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
}
</style>
