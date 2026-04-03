"use strict";(self.webpackChunkneat_admin_template=self.webpackChunkneat_admin_template||[]).push([["576"],{7969(e,l,s){s.r(l)},55176(e,l,s){s.r(l),s.d(l,{default:()=>d.default});var d=s(49856)},27621(e,l,s){s.r(l),s.d(l,{default:()=>x});var d=s(74848),r=s(96540),a=s(17125),n=s(16629),i=s(2105),t=s(58607),c=s(36813),o=s(892),h=s(55176);s(7969);let x=()=>{let[e,l]=(0,r.useState)([]),[s,x]=(0,r.useState)([]),[j,m]=(0,r.useState)([]),[p,g]=(0,r.useState)([]),[u,_]=(0,r.useState)([]),[A,v]=(0,r.useState)([]),[b,f]=(0,r.useState)([{id:"demo-1",url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",status:"done",percent:100}]),[U,y]=(0,r.useState)(!0),C=async e=>new Promise((l,s)=>{setTimeout(()=>{let d=new FileReader;d.onload=e=>{var s;l(null==(s=e.target)?void 0:s.result)},d.onerror=()=>{s(Error("Upload failed"))},d.readAsDataURL(e)},2e3)}),S=async e=>new Promise((l,s)=>{setTimeout(()=>{if(Math.random()>.5)s(Error("Upload failed"));else{let s=new FileReader;s.onload=e=>{var s;l(null==(s=e.target)?void 0:s.result)},s.readAsDataURL(e)}},1500)});return(0,d.jsxs)("div",{className:"image-upload-example",children:[(0,d.jsx)("h2",{className:"image-upload-example__title",children:"ImageUpload - 图片上传组件示例"}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"基础用法 - 拖拽上传（单图模式）",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"dragger 模式下只能上传一张图片，上传完成后替换上传区域，支持预览、删除和重新上传"}),(0,d.jsx)(h.default,{mode:"dragger",value:p,onChange:g,maxSize:5,accept:".jpg,.jpeg,.png"}),p.length>0&&(0,d.jsxs)("div",{style:{marginTop:16},children:[(0,d.jsx)(i.A,{color:"green",children:"已上传图片"}),(0,d.jsx)(t.Ay,{type:"link",onClick:()=>{var e;return a.Ay.info(`图片 URL: ${null==(e=p[0])?void 0:e.url}`)},children:"查看数据"})]})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"按钮模式 - 多图上传",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"使用按钮触发上传，支持多张图片，适合表单场景，可设置最大上传数量"}),(0,d.jsx)(h.default,{mode:"button",value:s,onChange:x,maxCount:3,maxSize:2,accept:".jpg,.jpeg,.png"}),s.length>0&&(0,d.jsxs)(c.A,{style:{marginTop:16},children:[(0,d.jsxs)(i.A,{color:"blue",children:["已上传 ",s.length," 张"]}),(0,d.jsx)(t.Ay,{type:"link",onClick:()=>x([]),children:"清空全部"})]})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"进度条展示",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"上传过程中显示真实的进度条动画，模拟实际上传进度，非线性增长更加逼真"}),(0,d.jsx)(h.default,{mode:"button",value:e,onChange:l,maxCount:5,maxSize:5,accept:".jpg,.jpeg,.png",showProgress:!0}),(0,d.jsxs)(c.A,{style:{marginTop:16},children:[(0,d.jsxs)(t.Ay,{type:"primary",onClick:()=>{a.Ay.success(`提交成功！共 ${e.length} 张图片`)},disabled:0===e.length,children:["提交 (",e.length,")"]}),(0,d.jsx)(t.Ay,{onClick:()=>{l([]),a.Ay.info("已清空")},disabled:0===e.length,children:"清空"})]})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"自定义上传函数",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"自定义上传逻辑，可以对接真实的后端接口，上传时间较长（2秒）以观察进度条效果"}),(0,d.jsx)(h.default,{mode:"button",value:j,onChange:m,maxCount:3,maxSize:5,accept:".jpg,.jpeg,.png",customUpload:C})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"上传失败处理",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"模拟上传失败场景（50% 失败率），失败的图片会显示错误状态，可以删除后重试"}),(0,d.jsx)(h.default,{mode:"button",value:u,onChange:_,maxCount:5,maxSize:5,accept:".jpg,.jpeg,.png",customUpload:S}),u.some(e=>"error"===e.status)&&(0,d.jsxs)("div",{style:{marginTop:16},children:[(0,d.jsxs)(i.A,{color:"red",children:["有 ",u.filter(e=>"error"===e.status).length," ","张图片上传失败"]}),(0,d.jsx)(t.Ay,{type:"link",danger:!0,onClick:()=>_(u.filter(e=>"error"!==e.status)),children:"清除失败项"})]})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"禁用状态",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"禁用状态下无法上传、删除图片，仅可预览。适用于只读或审核场景"}),(0,d.jsxs)(c.A,{direction:"vertical",style:{width:"100%"},children:[(0,d.jsxs)(c.A,{children:[(0,d.jsx)(t.Ay,{onClick:()=>y(!U),children:U?"启用上传":"禁用上传"}),(0,d.jsxs)(i.A,{color:U?"red":"green",children:["当前状态: ",U?"禁用":"启用"]})]}),(0,d.jsx)(h.default,{mode:"button",value:b,onChange:f,maxCount:3,maxSize:5,accept:".jpg,.jpeg,.png",disabled:U})]})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"隐藏进度条",children:[(0,d.jsx)("p",{className:"image-upload-example__desc",children:"设置 showProgress=false 可以隐藏上传进度条，适用于不需要展示上传进度的场景"}),(0,d.jsx)(h.default,{mode:"button",value:A,onChange:v,maxCount:5,maxSize:5,accept:".jpg,.jpeg,.png",showProgress:!1})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsxs)(n.A,{title:"组件 API",children:[(0,d.jsx)("h3",{children:"Props"}),(0,d.jsxs)("table",{className:"image-upload-example__table",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"参数"}),(0,d.jsx)("th",{children:"说明"}),(0,d.jsx)("th",{children:"类型"}),(0,d.jsx)("th",{children:"默认值"})]})}),(0,d.jsxs)("tbody",{children:[(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"maxCount"}),(0,d.jsx)("td",{children:"最大上传数量"}),(0,d.jsx)("td",{children:"number"}),(0,d.jsx)("td",{children:"5"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"maxSize"}),(0,d.jsx)("td",{children:"单个文件最大大小（MB）"}),(0,d.jsx)("td",{children:"number"}),(0,d.jsx)("td",{children:"5"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"accept"}),(0,d.jsx)("td",{children:"接受的文件类型"}),(0,d.jsx)("td",{children:"string"}),(0,d.jsx)("td",{children:"'.jpg,.jpeg,.png'"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"value"}),(0,d.jsx)("td",{children:"已上传的图片列表"}),(0,d.jsx)("td",{children:"UploadedImage[]"}),(0,d.jsx)("td",{children:"[]"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"onChange"}),(0,d.jsx)("td",{children:"图片列表变化时的回调"}),(0,d.jsx)("td",{children:"(images: UploadedImage[]) => void"}),(0,d.jsx)("td",{children:"-"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"mode"}),(0,d.jsx)("td",{children:"上传模式（dragger 模式仅支持单图）"}),(0,d.jsx)("td",{children:"'dragger' | 'button'"}),(0,d.jsx)("td",{children:"'dragger'"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"disabled"}),(0,d.jsx)("td",{children:"是否禁用"}),(0,d.jsx)("td",{children:"boolean"}),(0,d.jsx)("td",{children:"false"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"customUpload"}),(0,d.jsx)("td",{children:"自定义上传函数"}),(0,d.jsx)("td",{children:"(file: File) => Promise<string>"}),(0,d.jsx)("td",{children:"-"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"onUploadStart"}),(0,d.jsx)("td",{children:"上传开始回调"}),(0,d.jsx)("td",{children:"() => void"}),(0,d.jsx)("td",{children:"-"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"onUploadEnd"}),(0,d.jsx)("td",{children:"上传结束回调"}),(0,d.jsx)("td",{children:"() => void"}),(0,d.jsx)("td",{children:"-"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"concurrentLimit"}),(0,d.jsx)("td",{children:"并发上传数量限制"}),(0,d.jsx)("td",{children:"number"}),(0,d.jsx)("td",{children:"3"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"showProgress"}),(0,d.jsx)("td",{children:"是否显示进度条"}),(0,d.jsx)("td",{children:"boolean"}),(0,d.jsx)("td",{children:"true"})]})]})]}),(0,d.jsx)(o.A,{}),(0,d.jsx)("h3",{children:"UploadedImage 类型"}),(0,d.jsxs)("table",{className:"image-upload-example__table",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"字段"}),(0,d.jsx)("th",{children:"说明"}),(0,d.jsx)("th",{children:"类型"})]})}),(0,d.jsxs)("tbody",{children:[(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"id"}),(0,d.jsx)("td",{children:"唯一标识"}),(0,d.jsx)("td",{children:"string"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"url"}),(0,d.jsx)("td",{children:"图片地址"}),(0,d.jsx)("td",{children:"string"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"status"}),(0,d.jsx)("td",{children:"上传状态"}),(0,d.jsx)("td",{children:"'uploading' | 'done' | 'error'"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"percent"}),(0,d.jsx)("td",{children:"上传进度（0-100）"}),(0,d.jsx)("td",{children:"number"})]})]})]})]})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsx)(n.A,{title:"功能特性",children:(0,d.jsxs)("ul",{className:"image-upload-example__features",children:[(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"blue",children:"单图模式"}),"dragger 模式支持单图上传，上传完成后替换显示"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"green",children:"多图上传"}),"button 模式支持多图上传，网格布局展示"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"orange",children:"拖拽上传"}),"支持拖拽文件到指定区域上传"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"purple",children:"逼真进度"}),"非线性进度条模拟，快→慢过渡更逼真"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"cyan",children:"图片预览"}),"点击预览大图，右上角关闭按钮"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"red",children:"删除/重传"}),"支持删除和重新上传图片"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"blue",children:"文件校验"}),"自动校验文件类型、大小和数量"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"red",children:"错误处理"}),"上传失败显示错误状态，支持重试"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"orange",children:"禁用状态"}),"支持禁用上传，适用于只读场景"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"red",children:"自定义上传"}),"支持自定义上传逻辑，对接真实 API"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"orange",children:"并发控制"}),"支持设置并发上传数量限制"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)(i.A,{color:"green",children:"响应式设计"}),"适配移动端和桌面端"]})]})})}),(0,d.jsx)("div",{className:"image-upload-example__section",children:(0,d.jsx)(n.A,{title:"使用示例",children:(0,d.jsx)("div",{className:"image-upload-example__code",children:`import ImageUpload, { UploadedImage } from '~/components/ImageUpload';

// 示例 1: dragger 模式（单图）
const SingleImageUpload = () => {
  const [image, setImage] = useState<UploadedImage[]>([]);

  return (
    <ImageUpload
      mode="dragger"
      value={image}
      onChange={setImage}
      maxSize={5}
      accept=".jpg,.jpeg,.png"
    />
  );
};

// 示例 2: button 模式（多图）
const MultipleImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  return (
    <ImageUpload
      mode="button"
      value={images}
      onChange={setImages}
      maxCount={5}
      maxSize={5}
      accept=".jpg,.jpeg,.png"
    />
  );
};

// 示例 3: 自定义上传
const customUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.url;
};

<ImageUpload
  mode="button"
  value={images}
  onChange={setImages}
  customUpload={customUpload}
  onUploadStart={() => console.log('Upload started')}
  onUploadEnd={() => console.log('Upload completed')}
  concurrentLimit={2}
/>

// 示例 4: 处理上传失败
const uploadWithRetry = async (file: File): Promise<string> => {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: file,
    });
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// 示例 5: 禁用状态（只读模式）
<ImageUpload
  mode="button"
  value={images}
  onChange={setImages}
  disabled={true}
/>`})})})]})}}}]);