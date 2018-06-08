<template>
  <div class="card">
    <div class="header">
      <h4 class="title text-left">Signature</h4>
    </div>
  
    <div class="content">
      <div :class="{ hidden: !isHidden }">
        <canvas ref="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="500px" height="500px"></canvas>
        <br><br>
        <div class="row">
          <div class="text-left col-sm-2">
            <button type="submit" class="btn btn-success btn-fill btn-wd" @click.prevent="done">
              <i class="ti-check"></i>
            </button>
          </div>
          <div class="text-right col-sm-3">
            <button type="submit" class="btn btn-danger btn-fill btn-wd" @click.prevent="clear">
              <i class="ti-trash"></i>
            </button>
          </div>
        </div>
      </div>
            
      <div :class="{ hidden: isHidden }" class="text-center col-sm-6">
        <img
          :src="canvasimg"
          height="200px"
        >
        <div class="row">
          <div class="text-left col-sm-6">
            <button type="submit" class="btn btn-warning btn-fill btn-wd" @click.prevent="redo">
              <i class="ti-reload"></i>
            </button>
          </div>
          <div class="text-right col-sm-6">
            <button type="submit" class="btn btn-success btn-fill btn-wd" @click.prevent="save">
              <i class="ti-save"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'signature-board',
  props: ['user_role'],
  data: function () {
    return {
      c: null,
      ctx: null,
      canvasimg: "",
      isShow: false,
      isHidden: true,
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      config : {
        headers: {'Accept': 'application/json'}
      }
    }
  },
  mounted: function(){
    this.c = this.$refs.canvas
    this.ctx = this.c.getContext("2d")
  },
  computed: {
    currentMouse: function () {
      var rect = this.c.getBoundingClientRect();
  
      return {
        x: this.mouse.current.x,
        y: this.mouse.current.y
      }
    },
  },
  methods: {
    draw: function (event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down ) {
        
        var w = this.c.width;
        var h = this.c.height;

        this.ctx.clearRect(0, 0, w, h);
        
        this.ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        this.ctx.strokeStyle ="#0c0c0c";
        this.ctx.lineWidth = 2;
        this.ctx.stroke()
      }
     
    },
    handleMouseDown: function (event) {
      
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      
      this.ctx.moveTo(this.currentMouse.x, this.currentMouse.y)

    },
    handleMouseUp: function () {
      this.mouse.down = false;
    },
    handleMouseMove: function (event) {

      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      
      this.draw(event)
      
    }, 
    clear: function () {
      
      var w = this.c.width;
      var h = this.c.height;
      
      this.ctx.beginPath()                      
      this.ctx.clearRect(0,0, w, h);
    
    },
    done() {
      var dataURL = this.c.toDataURL("image.png");
      this.canvasimg = dataURL;
      this.isHidden = false; 
    },
    redo() {
      this.isHidden = true;
      this.canvasimg = "" 
    },
    save() {
        var dataURL = this.canvasimg
        dataURL = dataURL.replace('data:image/png;base64,', '');
          // Native form submission is not yet supported
        axios.post('http://127.0.0.1:5000/api/signature', {
          'signature': dataURL
        }, {withCredentials: true}, {
            headers: 
            {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000', 'Content-Type': 'application/json'}
          })
        .then(response => {
          if(response.data){
            this.$router.push('/login')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    ready: function () {
                      
      this.ctx.translate(0.5, 0.5);
      this.ctx.imageSmoothingEnabled= false;
    // this.draw();
    }
  }
};

</script>

<style>
    canvas{
        background-color: #fff;
        position: relative;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    }
</style>