precision highp float;

uniform float uIntensity;
uniform vec3 uColor;
varying float vFalloff;

void main() {
  float glow = pow(max(vFalloff, 0.0), 1.6) * uIntensity;
  vec3 color = uColor * glow;
  gl_FragColor = vec4(color, glow);
}
