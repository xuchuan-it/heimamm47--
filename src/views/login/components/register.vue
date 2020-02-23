<template>
  <!-- 注册对话框 -->
  <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="regForm" :model="form" :rules="rules">
      <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" @click="getNewCode" :src="picCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 
              倒计时不为0禁用按钮
              倒计时不为0，代表还有倒计时在数，所以按钮就不能被点，不能被点就是要禁用他
            -->
            <el-button
              :disabled="sec != 0"
              @click="getPhoneCode"
            >{{ sec == 0 ? '获取用户验证码' : "还有" + sec + '秒' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
// import { sendSMS } from "../../../api/register";
import { sendSMS,register } from "@/api/register";
export default {
    //方便自己查询
    name:'xxooo',
  data() {
    return {
      //要上传图片的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      //上传后头像的路径
      imageUrl: "",

      // 倒计时的秒数
      sec: 0,

      // 图形验证码的接口地址 process.env.VUE_APP_URL 是拼接.env里面的全局url地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",

      // 是否显示对话框
      dialogFormVisible: false,

      // 设置文字宽度
      formLabelWidth: "65px",

      // 跟表单元素双向绑定的对象
      form: {
        //头像
        avatar:"",
        //用户名
        name: "",
        //邮箱
        email: "",
        //手机号
        phone: "",
        //密码
        password: "",
        //图形验证码
        imgCode: "",
        //手机验证码
        rcode:""
      },
      // 规则对象
      rules: {
          //头像规则
          avatar:[
              { required: true, message: "头像不能为空", trigger: "change" }
          ],
            //图片验证码规则
           imgCode:[
               { required: true, message: "图片验证码不能为空", trigger: "blur" },
               //len 就是用来限制长度的
               {len:4,message:"图片验证码只能是4位",trigger:"blur"}
           ],
            //手机验证码规则
           rcode:[
               { required: true, message: "手机验证码不能为空", trigger: "blur" },
               {len:4,message:"手机验证码只能是4位",trigger:"blur"}
           ],

        //昵称规则
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        //邮箱规则
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },

          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        //手机号规则
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        //密码规则
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
      doRegister(){
          this.$refs.regForm.validate(v=>{
              if(v){
                  //注册账号
                register({
                    username:this.form.name,
                    phone:this.form.phone,
                    email:this.form.email,
                    avatar:this.form.avatar,
                    password:this.form.password,
                    rcode:this.form.rcode,
                }).then(res=>{
                    if (res.data.code==200) {
                        this.$message.success('注册成功!')
                        //重置表单,他只能重置表单元素
                        //而img不是表单元素,所以只要img绑定的url还在,他就一直在显示
                        this.$refs.regForm.resetFields();
                        this.imageUrl = "";
                        //注册成功,关闭对话框
                        this.dialogFormVisible=false;
                    }else{
                        //有问题,就把问题显示出来
                        this.$message.error(res.data.message);
                    }
                });
              }
          })
      },

    //头像上传
    handleAvatarSuccess(res, file) {
        //上传成功调用的钩子
        //res就是响应报文
        //file就是文件信息
        window.console.log(res);
        //把图片转成了临时路径,给了imageUrl
        //所以此时img标签有值,但是avatar没有值
      this.imageUrl = URL.createObjectURL(file.raw);
        //上传成功还要给avatar赐值,手动来赐值才让他有值的,没有事件重新效验
        this.form.avatar = res.data.file_path;
        //这个时候我们就要想办法,单独给这个属性做一次效验 
        // 饿了吗-UI  一个属性可以做  就是这样写    表单对象.validateField('属性名字')
        this.$refs.regForm.validateField('avatar')

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" ||"image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 图片的点击事件
    getNewCode() {
      // 浏览器缓存机制
      // 浏览器发现你这次请求，我刚刚才请求过，他就不会真的去发请求，而是会把上次请求得到的结果
      // 再拿出来用
      // 专门用来解决请求缓存的两套方案
      // 1. 随机数（用的少一点）
      // 2. 时间戳（用的多一点）
      // this.picCodeUrl = process.env.VUE_APP_URL +  "/captcha?type=sendsms&sb=" + Math.random()

      // 2.时间戳
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now();
    },

    //获取手机点击事件
    getPhoneCode() {
      //判断手机是否合法
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        //提示用户手机不合法
        return this.$message.error("手机号码格式不对");
      }
      if (this.form.imgCode.length != 4) {
        //提示用户手机用户不合法
        this.$message.error("验证码长度不正确");
        return;
      }

      this.sec = 60;

      // 写一个每隔一秒触发的计时器
      // 这里一定要传箭头函数
      let timerID = setInterval(() => {
        this.sec--;

        // 如果倒计时为0，就要停止计时器了
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);

      //传入一个接口的对象就可以了
      sendSMS({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);

        if (res.data.code == 200) {
          // 获取验证码成功
          //   alert('获取验证码成功，验证码为' + res.data.data.captcha)
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          //   alert(res.data.message)
          this.$message.error(res.data.message);
        }
      });

      // 发请求获取手机验证码
      // axios如果发跨域请求，默认不会携带cookie
      //   axios({
      //     url: process.env.VUE_APP_URL + "/sendsms",
      //     method: "post",
      //     data: {
      //       code: this.form.imgCode,
      //       phone: this.form.phone
      //     },
      //     // 允许携带cookie
      //     withCredentials:true
      //   }).then(res => {
      //     //成功回调
      //     window.console.log(res);

      //     if(res.data.code == 200){

      //       // 获取验证码成功
      //     //   alert('获取验证码成功，验证码为' + res.data.data.captcha)
      //     this.$message.success('获取验证码成功，验证码为' + res.data.data.captcha)

      //     }else{

      //     //   alert(res.data.message)
      //     this.$message.error(res.data.message)
      //     }
      //   });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}

.el-dialog__title {
  color: white;
  font-size: 17px;
}
.img_code {
  width: 100%;
  height: 41px;
  vertical-align: top;
}

.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>