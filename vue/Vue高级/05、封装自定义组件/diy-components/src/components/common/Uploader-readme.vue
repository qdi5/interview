<script>
// 验证图片
// var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
// 读取文件
function _readFile (file, resultType) {
  return new Promise(function (resolve) {
    var reader = new FileReader()
    reader.onload = function (event) {
      resolve(event.target.result)
    }
    if (resultType === 'dataUrl') {
      // 读取指定的Blob或File对象。并返回以base64编码表示的文件内容
      reader.readAsDataURL(file)
    } else if (resultType === 'text') {
      // 将Blob或者File对象根据特殊的编码格式转化为字符串形式
      reader.readAsText(file)
    }
  })
}

export default {
  name: 'uploader',
  model: {
    prop: 'fileList'
  },
  props: {
    // input元素的name属性对应的值
    name: {
      type: [Number, String],
      default: ''
    },
    // 能够选择的文件类型
    accept: {
      type: String,
      default: 'image/*'
    },
    // v-model绑定的值
    fileList: {
      type: Array,
      default: function _default () {
        return []
      }
    },
    // 读取文件后返回的数据类型
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    // 最大数量
    maxCount: {
      type: Number,
      default: Number.MAX_VALUE
    },
    // 单文件大小控制
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE
    },
    // 帮助文字
    helpText: {
      type: String
    },
    // 预览区域和上传组件的大小
    previewSize: {
      type: Number,
      default: 80
    }
  },
  methods: {
    // 获取slot
    slots: function slots (name, props) {
      if (name === undefined) {
        name = 'default'
      }
      // 作用域插槽
      var $scopedSlots = this.$scopedSlots
      var scopedSlot = $scopedSlots[name]
      if (scopedSlot) {
        // 当没有作用域插槽时，这里取的就是默认插槽，实际上就是一个VNode
        return scopedSlot(props)
      }
      return scopedSlot
    },
    // 3
    onChange: function onChange (event) {
      // 当前选中的文件对象数组
      var files = event.target.files

      if (!files.length) {
        return
      }

      files = files.length === 1 ? files[0] : [].slice.call(files) // 将类数组转换为数组
      this.readFile(files)
    },
    // 4
    readFile: function readFile (files) {
      // debugger
      var _this2 = this
      // 是否超过大小
      var oversize = isOversize(files, this.maxSize)

      if (Array.isArray(files)) {
        // 当选择了多个文件时，如果组件设置了maxCount，则需要先去掉已经选择的文件个数（也就是this.fileList.length）
        var maxCount =
          this.maxCount - ((this.fileList && this.fileList.length) || 0) // 这里计算出来的maxCount，是剩余可以选择的文件个数
        // 如果超过了设置的总数，需要截取
        if (files.length > maxCount) {
          files = files.slice(0, maxCount)
        }
        // 多个异步读取文件操作完成后，返回对应的文件数据
        Promise.all(
          files.map(function (file) {
            return _readFile(file, _this2.resultType)
          })
        ).then(function (contents) {
          var fileList = files.map(function (file, index) {
            return {
              file: file,
              content: contents[index]
            }
          })
          _this2.onAfterRead(fileList, oversize)
        })
      } else {
        _readFile(files, this.resultType).then(function (content) {
          _this2.onAfterRead(
            {
              file: files,
              content: content
            },
            oversize
          )
        })
      }
    },
    // 5
    onAfterRead: function onAfterRead (files, oversize) {
      if (oversize) {
        this.$emit('oversize', files, this.detail)
        return
      }
      // ？？？这里为啥要清空input的值
      this.resetInput()
      // 更新父组件v-model绑定的变量对应的数据；由于双向数据绑定的原因，这里的fileList也更新为最新值了，触发了render函数的重新渲染
      this.$emit('input', [].concat(this.fileList || [], toArray(files)))

      if (this.afterRead) {
        this.afterRead(files, this.detail)
      }
    },
    onDelete: function onDelete (file, index) {
      // 这里可以处理before delete的逻辑
      // console.log('删除的图片：', file, index)
      this.deleteFile(file, index)
    },
    deleteFile: function deleteFile (file, index) {
      // 这里拷贝了一份fileList的数据，遵循props单向数据流的原则
      const fileList = this.fileList.slice(0)
      fileList.splice(index, 1)
      // 通知父组件更新v-model绑定的值
      this.$emit('input', fileList) // 这一步很关键，更新父组件绑定的值，同时也同步给了当前组件的fileList
      // 触发自定义事件delete
      this.$emit('delete', file)
    },
    // 清空input[type='file']的值
    resetInput: function resetInput () {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = ''
      }
    },
    // 渲染预览区域 （这个函数依赖的数据变化时，会重新执行，比如fileList变化后） 1
    renderPreview: function renderPreview () {
      // debugger
      const _this = this
      const h = _this.$createElement
      if (!_this.fileList || !_this.fileList.length) {
        return
      }
      return _this.fileList.map(function (item, index) {
        return h(
          'div',
          {
            class: 'uploader-preview'
          },
          [
            h('div', { class: 'uploader-preview-image' }, [
              h('img', {
                attrs: {
                  src: item.content || item.url,
                  width: _this.previewSize + 'px',
                  height: _this.previewSize + 'px'
                },
                style: {
                  'object-fit': 'cover'
                }
              })
            ]),
            h(
              'i',
              {
                class: 'iconfont icon-delete preview-delete',
                // 给删除图标绑定事件
                on: {
                  click: function click () {
                    _this.onDelete(item, index)
                  }
                }
              }
            )
          ]
        )
      })
    },
    // 渲染上传区域  2
    renderUpload: function renderUpload () {
      // debugger
      const h = this.$createElement
      // 如果选择的文件总数达到了设置的值，则不再渲染'上传按钮'；（控制上传个数的核心代码）
      if (this.fileList && this.fileList.length >= this.maxCount) {
        return
      }
      //
      var slot = this.slots()
      // 获取组件中，除了props的其他属性（不包含class和style）
      var existAttrs = this.$attrs
      var extendAtrrs = {
        class: 'uploader-input',
        attrs: _extends({}, existAttrs, {
          type: 'file',
          accept: this.accept
        }),
        ref: 'input',
        // 给input绑定change事件
        on: {
          change: this.onChange
        }
      }
      var Input = h('input', extendAtrrs)
      // 如果有slot，那么就使用slot渲染上传按钮，直接return
      if (slot) {
        return h(
          'div',
          {
            class: 'input-wrapper'
          },
          [slot, Input]
        )
      }

      return h(
        'div',
        {
          class: 'uploader-upload',
          style: {
            width: this.previewSize + 'px',
            height: this.previewSize + 'px'
          }
        },
        [
          h(
            'i',
            {
              class: 'iconfont icon-62tianjia uploader-icon'
            }
          ),
          this.helpText &&
            h(
              'span',
              {
                class: 'upload-text'
              },
              this.helpText
            ),
          Input
        ]
      )
    }
  },
  computed: {
    // 获取input的name值
    detail: function detail () {
      return {
        name: this.name
      }
    }
  },
  render (h) {
    console.log('触发render了')
    return h('div',
      { class: 'uploader' },
      [h('div',
        { class: 'uploader-wrapper' },
        [this.renderPreview(), this.renderUpload()]
      )
      ])
  }
}
</script>

<style lang='less' scoped>
@import './style/iconfont.css';
.uploader {
  position: relative;
  display: inline-block;
  .uploader-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .uploader-preview {
    position: relative;
    margin: 0 8px 8px 0;
    .preview-delete {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 1px;
      color: #fff;
      background: rgba(0, 0, 0, 0.45);
    }
  }
  .uploader-preview-image {
    position: relative;
    display: block;
    & > .img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .uploader-upload {
    margin: 0 8px 8px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px dashed #e5e5e5;
  }
  .uploader-icon {
    color: #969799;
    font-size: 40px;
  }

  .uploader-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  .input-wrapper {
    position: relative;
  }
  .upload-text {
    margin-top: 8px;
    font-size: 12px;
    color: #969799;
  }
}
</style>
