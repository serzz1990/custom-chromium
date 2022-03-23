try {
  Object.defineProperty(RTCIceCandidate.prototype, "address", {
    get() {
      return "%IP_ADDRESS%";
    },
  });
  Object.defineProperty(RTCIceCandidate.prototype, "candidate", {
    get() {
      return "candidate:842163049 1 udp 1677729535 %IP_ADDRESS% 14181 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999";
    },
  });
  Object.defineProperty(RTCPeerConnection.prototype, "localDescription", {
    get(a) {
      a = new RTCSessionDescription();
      (a.type = "offer"),
        (a.sdp = `v=0
o=- 6766620064232204419 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=msid-semantic: WMS
m=application 14381 UDP/DTLS/SCTP webrtc-datachannel
c=IN IP4 %IP_ADDRESS%
a=candidate:2318542686 1 udp 2113937151 cab5fa10-c732-40ec-99a4-5c9af6018170.local 61997 typ host generation 0 network-cost 999
a=candidate:842163049 1 udp 1677729535 %IP_ADDRESS% 14381 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999
a=ice-ufrag:7Lql
a=ice-pwd:DtTnHsUhCb56zaEmnHeAelsd
a=ice-options:trickle
a=fingerprint:sha-256 FU:CK:YU:39:C2:2C:E6:1D:E7:2D:50:81:AE:3C:CD:42:2D:86:EE:19:A7:5C:E6:21:9B:B9:F4:5F:97:15:34:5D
a=setup:actpass
a=mid:0
a=sctp-port:5000
a=max-message-size:262144`);
      return a;
    },
  });
} catch (err) {}
