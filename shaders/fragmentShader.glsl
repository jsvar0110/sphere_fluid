varying vec2 vUv;  
varying float vElevation;
uniform float uColorChange;

 void main() {
    vec4 c1 = vec4(0.8863, 0.5059, 0.9373, 1.0);
    vec4 c2 = vec4(1.0,1.0,1.0,1.0);

    vec4 c3 = vec4(0.4863, 0.5294, 0.9255, 1.0);
    vec4 c4 = vec4(0.9451, 0.9451, 0.9451, 1.0);


    float v = smoothstep(-.14,.15,vElevation*.2);
    vec4 colorred = mix(c1,c2,v);
    vec4 coloryellow = mix(c3,c4,v);

    vec4 final = mix(colorred,coloryellow,uColorChange);
    gl_FragColor = final;
  }