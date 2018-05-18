 /* eslint-disable */
import { getTemplate, getSlotContent, getStringTypeAttr  } from '@/views/designerPage/components/template'

var handle = function(_attr, _slots) {
    //定义默认属性
    let attributes = {
            span:{
                type: 'slider',
                value: 10,
                max: 24,
                min: 0,
                step: 1
            },
            order:{
                type:'number',
                value: 1
            },
            offset:{
                type:'number',
                value: 0
            },
            push:{
                type:'number',
                value: 0
            },
            xs:{
                type:'number',
                value: 10
            },
            sm:{
                type:'number',
                value: 8
            },
            md:{
                type:'number',
                value: 6
            },
            lg:{
                type:'number',
                value: 4
            }
        },
        slots = {
            default: []
        }

    //覆盖默认属性
    Object.assign(slots, _slots)
    Object.assign(attributes, _attr)

    //根据组件不同需要做的不同操作


    //获取插槽模板内容
    var subContent = getSlotContent(slots) || '&nbsp;'
    //设置当前组件的slot
    if (attributes.slot && attributes.slot!=='default') {
        attributes.slot = {
            type: 'text',
            value: attributes.slot
        }
    } else {
        attributes.slot = {
            type: 'text',
            value: ''
        }
    }

    //字符串模板操作
    let stringAttr = getStringTypeAttr(attributes)
    let template = `<Col 
                    	${stringAttr}>
                        ${subContent}
                    </Col>`

    return { template, attributes, slots }
}
export default handle
