"use client";

import { useEffect, useRef } from "react";

interface LiquidHoverProps {
  imageSrc?: string;
  resolution?: number;
  cursorSize?: number;
  intensity?: number;
  style?: React.CSSProperties;
}

export default function LiquidHover({
  imageSrc = "",
  resolution = 5,
  cursorSize = 50,
  intensity = 60,
  style,
}: LiquidHoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const glMaybe = canvas.getContext("webgl", { alpha: true });
    if (!glMaybe) return;
    const gl: any = glMaybe;
    gl.getExtension("OES_texture_float");
    gl.getExtension("OES_texture_float_linear");
    gl.clearColor(0, 0, 0, 0);

    const cp = intensity / 100;
    const params = {
      cursorRadiusPx: cursorSize,
      cursorPower: 5 + ((cp - 0.1) * (50 - 5)) / (1 - 0.1),
      distortionPower: intensity / 100,
    };
    const overscanFactor = 1.2;
    const innerScale = 5 / 6;
    const pointer = { x: 0.65 * container.clientWidth, y: 0.5 * container.clientHeight, dx: 0, dy: 0, moved: false };
    const res = { w: 0, h: 0 };
    let outputColor: any, velocity: any, divergence: any, pressure: any;
    let imageTexture: any = null;
    let imgRatio = 1;
    let isHovering = false;

    const VERT = `precision highp float;varying vec2 vUv;attribute vec2 a_position;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform vec2 u_texel;void main(){vUv=.5*(a_position+1.);vL=vUv-vec2(u_texel.x,0.);vR=vUv+vec2(u_texel.x,0.);vT=vUv+vec2(0.,u_texel.y);vB=vUv-vec2(0.,u_texel.y);gl_Position=vec4(a_position,0.,1.);}`;
    const FRAG_ADVECT = `precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D u_velocity_texture;uniform sampler2D u_input_texture;uniform vec2 u_texel;uniform vec2 u_output_textel;uniform float u_dt;uniform float u_dissipation;vec4 bilerp(sampler2D sam,vec2 uv,vec2 tsize){vec2 st=uv/tsize-0.5;vec2 iuv=floor(st);vec2 fuv=fract(st);vec4 a=texture2D(sam,(iuv+vec2(0.5,0.5))*tsize);vec4 b=texture2D(sam,(iuv+vec2(1.5,0.5))*tsize);vec4 c=texture2D(sam,(iuv+vec2(0.5,1.5))*tsize);vec4 d=texture2D(sam,(iuv+vec2(1.5,1.5))*tsize);return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);}void main(){vec2 coord=vUv-u_dt*bilerp(u_velocity_texture,vUv,u_texel).xy*u_texel;vec4 velocity=bilerp(u_input_texture,coord,u_output_textel);gl_FragColor=u_dissipation*velocity;}`;
    const FRAG_DIVERGENCE = `precision highp float;precision highp sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D u_velocity_texture;void main(){float L=texture2D(u_velocity_texture,vL).x;float R=texture2D(u_velocity_texture,vR).x;float T=texture2D(u_velocity_texture,vT).y;float B=texture2D(u_velocity_texture,vB).y;float div=.25*(R-L+T-B);gl_FragColor=vec4(div,0.,0.,1.);}`;
    const FRAG_PRESSURE = `precision highp float;precision highp sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D u_pressure_texture;uniform sampler2D u_divergence_texture;void main(){float L=texture2D(u_pressure_texture,vL).x;float R=texture2D(u_pressure_texture,vR).x;float T=texture2D(u_pressure_texture,vT).x;float B=texture2D(u_pressure_texture,vB).x;float divergence=texture2D(u_divergence_texture,vUv).x;float pressure=(L+R+B+T-divergence)*.25;gl_FragColor=vec4(pressure,0.,0.,1.);}`;
    const FRAG_GRAD_SUB = `precision highp float;precision highp sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D u_pressure_texture;uniform sampler2D u_velocity_texture;void main(){float L=texture2D(u_pressure_texture,vL).x;float R=texture2D(u_pressure_texture,vR).x;float T=texture2D(u_pressure_texture,vT).x;float B=texture2D(u_pressure_texture,vB).x;vec2 velocity=texture2D(u_velocity_texture,vUv).xy;velocity.xy-=vec2(R-L,T-B);gl_FragColor=vec4(velocity,0.,1.);}`;
    const FRAG_POINT = `precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D u_input_texture;uniform float u_ratio;uniform float u_img_ratio;uniform vec3 u_point_value;uniform vec2 u_point;uniform float u_point_size;void main(){vec2 p=vUv-u_point.xy;p.x*=u_ratio;vec3 splat=.6*pow(2.,-dot(p,p)/u_point_size)*u_point_value;vec3 base=texture2D(u_input_texture,vUv).xyz;gl_FragColor=vec4(base+splat,1.);}`;
    const FRAG_OUTPUT = `precision highp float;precision highp sampler2D;varying vec2 vUv;uniform float u_ratio;uniform float u_img_ratio;uniform float u_disturb_power;uniform sampler2D u_output_texture;uniform sampler2D u_velocity_texture;uniform sampler2D u_text_texture;uniform vec2 u_point;uniform float u_canvas_scale;uniform float u_inner_scale;vec2 get_img_uv(){vec2 uv=vUv-0.5;uv*=u_canvas_scale;uv/=u_inner_scale;float containerAspect=u_ratio;float imageAspect=u_img_ratio;vec2 scale=vec2(1.0);if(containerAspect>imageAspect){scale.y=imageAspect/containerAspect;}else{scale.x=containerAspect/imageAspect;}uv*=scale;return uv+0.5;}vec2 get_frame_uv(){vec2 uv=vUv-0.5;uv*=u_canvas_scale;uv/=u_inner_scale;return uv+0.5;}float get_img_frame_alpha(vec2 uv,float w){float a=smoothstep(0.,w,uv.x)*smoothstep(1.,1.-w,uv.x);a*=smoothstep(0.,w,uv.y)*smoothstep(1.,1.-w,uv.y);return a;}void main(){float offset=texture2D(u_output_texture,vUv).r;vec2 velocity=texture2D(u_velocity_texture,vUv).xy;velocity+=.001;vec2 img_uv=get_img_uv();img_uv-=u_disturb_power*normalize(velocity)*offset;vec2 frame_uv=get_frame_uv();frame_uv-=u_disturb_power*normalize(velocity)*offset;vec3 img=texture2D(u_text_texture,vec2(clamp(img_uv.x,0.,1.),1.-clamp(img_uv.y,0.,1.))).rgb;float opacity=get_img_frame_alpha(frame_uv,.002);gl_FragColor=vec4(img*opacity,opacity);}`;

    function createShader(source: string, type: number) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }
    function createProgram(vs: string, fs: string) {
      const program = gl.createProgram();
      gl.attachShader(program, createShader(vs, gl.VERTEX_SHADER));
      gl.attachShader(program, createShader(fs, gl.FRAGMENT_SHADER));
      gl.bindAttribLocation(program, 0, "a_position");
      gl.linkProgram(program);
      const uniforms: Record<string, any> = {};
      const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const u = gl.getActiveUniform(program, i);
        if (u) uniforms[u.name] = gl.getUniformLocation(program, u.name);
      }
      return { program, uniforms };
    }
    function blit(target: any = null) {
      const vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
      const ebo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      if (target == null) { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
      else { gl.viewport(0, 0, target.width, target.height); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
    function createFBO(w: number, h: number) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.FLOAT, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { fbo, width: w, height: h, attach(id: number) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    }
    function createDoubleFBO(w: number, h: number) {
      let f1 = createFBO(w, h), f2 = createFBO(w, h);
      return { width: w, height: h, texelSizeX: 1/w, texelSizeY: 1/h, read: () => f1, write: () => f2, swap() { const t = f1; f1 = f2; f2 = t; } };
    }

    const splatP = createProgram(VERT, FRAG_POINT);
    const divP = createProgram(VERT, FRAG_DIVERGENCE);
    const presP = createProgram(VERT, FRAG_PRESSURE);
    const gradP = createProgram(VERT, FRAG_GRAD_SUB);
    const advP = createProgram(VERT, FRAG_ADVECT);
    const dispP = createProgram(VERT, FRAG_OUTPUT);

    function resizeCanvas() {
      const w = container!.clientWidth, h = container!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(2, Math.round(w * overscanFactor * dpr));
      canvas!.height = Math.max(2, Math.round(h * overscanFactor * dpr));
      canvas!.style.width = `${w * overscanFactor}px`;
      canvas!.style.height = `${h * overscanFactor}px`;
      const ratio = (w * overscanFactor) / (h * overscanFactor);
      const base = 128 + ((resolution - 1) * (512 - 128)) / 9;
      res.w = Math.round(base * ratio);
      res.h = Math.round(base);
    }
    function initFBOs() {
      outputColor = createDoubleFBO(res.w, res.h);
      velocity = createDoubleFBO(res.w, res.h);
      divergence = createFBO(res.w, res.h);
      pressure = createDoubleFBO(res.w, res.h);
    }
    function getPointerUV() {
      const cssW = container!.clientWidth * overscanFactor;
      const cssH = container!.clientHeight * overscanFactor;
      const dx = 0.5 * (cssW - container!.clientWidth);
      const dy = 0.5 * (cssH - container!.clientHeight);
      return { u: (pointer.x + dx) / cssW, v: 1 - (pointer.y + dy) / cssH };
    }
    function loadImage(src: string) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        imgRatio = img.naturalWidth / Math.max(1, img.naturalHeight);
        imageTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, imageTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, imageTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      };
    }
    function render(_t: number) {
      const dt = 1 / 60;
      if (pointer.moved) {
        pointer.moved = false;
        gl.useProgram(splatP.program);
        gl.uniform1i(splatP.uniforms.u_input_texture, velocity.read().attach(1));
        gl.uniform1f(splatP.uniforms.u_ratio, container!.clientWidth / Math.max(1, container!.clientHeight));
        const uv = getPointerUV();
        gl.uniform2f(splatP.uniforms.u_point, uv.u, uv.v);
        gl.uniform3f(splatP.uniforms.u_point_value, pointer.dx, -pointer.dy, 0);
        const rr = params.cursorRadiusPx / Math.max(1, container!.clientHeight);
        gl.uniform1f(splatP.uniforms.u_point_size, rr * rr);
        blit(velocity.write()); velocity.swap();
        gl.uniform1i(splatP.uniforms.u_input_texture, outputColor.read().attach(1));
        gl.uniform3f(splatP.uniforms.u_point_value, params.cursorPower * 0.001, 0, 0);
        blit(outputColor.write()); outputColor.swap();
      }
      gl.useProgram(divP.program);
      gl.uniform2f(divP.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divP.uniforms.u_velocity_texture, velocity.read().attach(1));
      blit(divergence);
      gl.useProgram(presP.program);
      gl.uniform2f(presP.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(presP.uniforms.u_divergence_texture, divergence.attach(1));
      for (let i = 0; i < 16; i++) { gl.uniform1i(presP.uniforms.u_pressure_texture, pressure.read().attach(2)); blit(pressure.write()); pressure.swap(); }
      gl.useProgram(gradP.program);
      gl.uniform2f(gradP.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradP.uniforms.u_pressure_texture, pressure.read().attach(1));
      gl.uniform1i(gradP.uniforms.u_velocity_texture, velocity.read().attach(2));
      blit(velocity.write()); velocity.swap();
      gl.useProgram(advP.program);
      gl.uniform2f(advP.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform2f(advP.uniforms.u_output_textel, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(advP.uniforms.u_velocity_texture, velocity.read().attach(1));
      gl.uniform1i(advP.uniforms.u_input_texture, velocity.read().attach(1));
      gl.uniform1f(advP.uniforms.u_dt, dt);
      gl.uniform1f(advP.uniforms.u_dissipation, 0.97);
      blit(velocity.write()); velocity.swap();
      gl.uniform2f(advP.uniforms.u_output_textel, outputColor.texelSizeX, outputColor.texelSizeY);
      gl.uniform1i(advP.uniforms.u_input_texture, outputColor.read().attach(2));
      gl.uniform1f(advP.uniforms.u_dt, 8 * dt);
      gl.uniform1f(advP.uniforms.u_dissipation, 0.98);
      blit(outputColor.write()); outputColor.swap();
      gl.useProgram(dispP.program);
      const uv2 = getPointerUV();
      gl.uniform2f(dispP.uniforms.u_point, uv2.u, uv2.v);
      gl.uniform1i(dispP.uniforms.u_velocity_texture, velocity.read().attach(2));
      gl.uniform1f(dispP.uniforms.u_ratio, container!.clientWidth / Math.max(1, container!.clientHeight));
      gl.uniform1f(dispP.uniforms.u_img_ratio, imgRatio);
      gl.uniform1f(dispP.uniforms.u_disturb_power, params.distortionPower);
      gl.uniform1i(dispP.uniforms.u_output_texture, outputColor.read().attach(1));
      gl.uniform1f(dispP.uniforms.u_canvas_scale, 1);
      gl.uniform1f(dispP.uniforms.u_inner_scale, innerScale);
      if (imageTexture) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, imageTexture); gl.uniform1i(dispP.uniforms.u_text_texture, 0); }
      blit();
      rafRef.current = requestAnimationFrame(render);
    }

    resizeCanvas();
    initFBOs();
    loadImage(imageSrc);

    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; pointer.moved = false; };
    const onMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = container!.getBoundingClientRect();
      pointer.moved = true;
      pointer.dx = 6 * (e.clientX - rect.left - pointer.x);
      pointer.dy = 6 * (e.clientY - rect.top - pointer.y);
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onTouchMove = (e: TouchEvent) => {
      isHovering = true;
      e.preventDefault();
      const t = e.targetTouches[0];
      const rect = container!.getBoundingClientRect();
      pointer.moved = true;
      pointer.dx = 6 * (t.clientX - rect.left - pointer.x);
      pointer.dy = 6 * (t.clientY - rect.top - pointer.y);
      pointer.x = t.clientX - rect.left;
      pointer.y = t.clientY - rect.top;
    };
    const onResize = () => { resizeCanvas(); initFBOs(); };
    const ro = new ResizeObserver(onResize);

    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchstart", () => { isHovering = true; }, { passive: true });
    canvas.addEventListener("touchend", () => { isHovering = false; pointer.moved = false; }, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);
    ro.observe(container);

    render(0);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [imageSrc, resolution, cursorSize, intensity]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "visible", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: "-10%", left: "-10%", width: "120%", height: "120%" }}
      />
    </div>
  );
}
