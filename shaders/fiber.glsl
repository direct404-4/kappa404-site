precision highp float;

uniform float uTime;
uniform vec3 uBase;
varying float vNoise;

void main() {
  float pulse = 0.55 + 0.45 * sin(uTime * 2.2 + vNoise * 6.2831);
  vec3 color = mix(uBase * 0.45, uBase * 1.25, pulse);
  gl_FragColor = vec4(color, 1.0);
}
