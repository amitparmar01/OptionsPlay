/* File generated Thu Jul 17 2014 13:13:10 GMT-0400 (EDT) */
/*
Copyright 2014
*/

(function () {

	var version = "Version 2014-08";
	if (version != STXChart.version)
		console.log("Mismatched kernel version stxChart:" + STXChart.version + " stxKernel:" + version);

	var domains = ["127.0.0.1", "localhost", "fcsc.com"];
	if (domains.length) {
		var href = document.location.href;
		var foundOne = true;
		for (var i = 0; i < domains.length; i++) {
			var domain = domains[i];
			if (href.indexOf(domain) != -1) {
				foundOne = true;
			}
		}
		if (!foundOne) {
			console.log("!!!! Not licensed for domain " + document.location.href);
		}
	}
})();

var S9y4F = {
	'K5c': function (Y5c, C5c) { return Y5c != C5c; }
, 'z1a': function (N1a, P1a) { return N1a != P1a; }
, 'S9V': function (Z9V, A9V) { return Z9V > A9V; }
, 'G2X': function (a2X, F2X) { return a2X <= F2X; }
, 'm6I': function (t6I, D6I) { return t6I == D6I; }
, 'J9c': function (W9c, f9c) { return W9c == f9c; }
, 'M0h': function (m0h, t0h) { return m0h < t0h; }
, 'd5X': function (x5X, E5X) { return x5X != E5X; }
, 'N5V': function (P5V, X5V) { return P5V / X5V; }
, 'O3V': function (l3V, u3V) { return l3V > u3V; }
, 'P0l': function (X0l, Q0l) { return X0l == Q0l; }
, 'B3V': function (T3V, w3V) { return T3V - w3V; }
, 'V3b': function (q3b, L3b) { return q3b == L3b; }
, 'p6K': "ode", 'r8l': function (k8l, I8l) { return k8l == I8l; }
, 'U9Z': "char", 'Z8l': function (A8l, z8l) { return A8l == z8l; }
, 'B0b': function (T0b, w0b) { return T0b <= w0b; }
, 'P0Q': function (X0Q, Q0Q) { return X0Q == Q0Q; }
, 'k6X': function (I6X, y6X) { return I6X > y6X; }
, 'e4N': function (p4N, b4N) { return p4N == b4N; }
, 'I7F': function (y7F, J7F) { return y7F / J7F; }
, 'o7X': function (c3X, V3X) { return c3X * V3X; }
, 'G9Q': function (a9Q, F9Q) { return a9Q < F9Q; }
, 'P3a': function (X3a, Q3a) { return X3a < Q3a; }
, 'o7c': function (c3c, V3c) { return c3c == V3c; }
, 'x5N': function (E5N, e5N) { return E5N == e5N; }
, 'j2c': function (H2c, n2c) { return H2c / n2c; }
, 'H9V': function (n9V, i9V) { return n9V >= i9V; }
, 'k3I': function (I3I, y3I) { return I3I == y3I; }
, 'a4b': function (F4b, S4b) { return F4b * S4b; }
, 'W1h': function (f1h, s1h) { return f1h / s1h; }
, 'x5b': function (E5b, e5b) { return E5b * e5b; }
, 't2l': function (D2l, U2l) { return D2l - U2l; }
, 'd8F': function (x8F, E8F) { return x8F == E8F; }
, 'H9I': function (n9I, i9I) { return n9I - i9I; }
, 'l5K': "2", 'j88': "Co", 'z0h': function (N0h, P0h) { return N0h < P0h; }
, 'N7c': function (P7c, X7c) { return P7c < X7c; }
, 'o1X': function (c2X, V2X) { return c2X - V2X; }
, 'W7c': function (f7c, s7c) { return f7c < s7c; }
, 'c4b': function (V4b, q4b) { return V4b < q4b; }
, 'M6X': function (m6X, t6X) { return m6X > t6X; }
, 'x9a': function (E9a, e9a) { return E9a * e9a; }
, 'A9X': function (z9X, N9X) { return z9X - N9X; }
, 'Q7F': function (h7F, M7F) { return h7F == M7F; }
, 'b3I': function (v3I, O3I) { return v3I == O3I; }
, 'e3Q': function (p3Q, b3Q) { return p3Q != b3Q; }
, 'J7N': function (W7N, f7N) { return W7N * f7N; }
, 'w9h': function (r9h, k9h) { return r9h < k9h; }
, 't2Q': function (D2Q, U2Q) { return D2Q <= U2Q; }
, 'b1N': function (v1N, O1N) { return v1N - O1N; }
, 'R5a': function (o5a, c6a) { return o5a == c6a; }
, 'I6I': function (y6I, J6I) { return y6I == J6I; }
, 'k3F': function (I3F, y3F) { return I3F < y3F; }
, 'i2a': function (G2a, a2a) { return G2a > a2a; }
, 'W7I': function (f7I, s7I) { return f7I === s7I; }
, 'p3N': function (b3N, v3N) { return b3N == v3N; }
, 'D2h': function (U2h, B2h) { return U2h == B2h; }
, 'a4a': function (F4a, S4a) { return F4a == S4a; }
, 'v1h': function (O1h, l1h) { return O1h >= l1h; }
, 'M9I': function (m9I, t9I) { return m9I > t9I; }
, 't6a': function (D6a, U6a) { return D6a / U6a; }
, 'f2Q': function (s2Q, d2Q) { return s2Q == d2Q; }
, 'O0X': function (l0X, u0X) { return l0X <= u0X; }
, 'V0b': function (q0b, L0b) { return q0b <= L0b; }
, 'e2F': function (p2F, b2F) { return p2F == b2F; }
, 'u7Q': function (g7Q, R7Q) { return g7Q == R7Q; }
, 'u8N': function (g8N, R8N) { return g8N * R8N; }
, 'J1V': function (W1V, f1V) { return W1V - f1V; }
, 'O5N': function (l5N, u5N) { return l5N == u5N; }
, 'w2F': function (r2F, k2F) { return r2F != k2F; }
, 'y9X': function (J9X, W9X) { return J9X == W9X; }
, 'O5b': function (l5b, u5b) { return l5b < u5b; }
, 'u7c': function (g7c, R7c) { return g7c * R7c; }
, 'W8N': function (f8N, s8N) { return f8N != s8N; }
, 'a3B': 4, 'x4c': function (E4c, e4c) { return E4c != e4c; }
, 't2N': function (D2N, U2N) { return D2N >= U2N; }
, 'Z3l': function (A3l, z3l) { return A3l - z3l; }
, 'S5a': function (Z5a, A5a) { return Z5a - A5a; }
, 'r0I': function (k0I, I0I) { return k0I == I0I; }
, 'n3l': function (i3l, G3l) { return i3l <= G3l; }
, 'b8l': function (v8l, O8l) { return v8l / O8l; }
, 'w8a': function (r8a, k8a) { return r8a == k8a; }
, 'Y3Q': function (C3Q, j3Q) { return C3Q - j3Q; }
, 'c8V': function (V8V, q8V) { return V8V == q8V; }
, 'u7F': function (g7F, R7F) { return g7F < R7F; }
, 'i5c': function (G5c, a5c) { return G5c / a5c; }
, 'r0a': function (k0a, I0a) { return k0a != I0a; }
, 'c5I': function (V5I, q5I, L5I) { return V5I * q5I / L5I; }
, 'e4l': function (p4l, b4l) { return p4l * b4l; }
, 'Q6b': function (h6b, M6b) { return h6b - M6b; }
, 'R9I': function (o9I, c0I) { return o9I == c0I; }
, 'J7b': function (W7b, f7b) { return W7b - f7b; }
, 'W6b': function (f6b, s6b) { return f6b <= s6b; }
, 'Q8N': function (h8N, M8N) { return h8N * M8N; }
, 'q9N': function (L9N, K9N) { return L9N == K9N; }
, 'Y1b': function (C1b, j1b) { return C1b != j1b; }
, 'v4V': function (O4V, l4V) { return O4V / l4V; }
, 'j0b': function (H0b, n0b) { return H0b in n0b; }
, 'X1X': function (Q1X, h1X) { return Q1X == h1X; }
, 'h2Q': function (M2Q, m2Q) { return M2Q >= m2Q; }
, 'a8V': function (F8V, S8V) { return F8V * S8V; }
, 'y2I': function (J2I, W2I) { return J2I < W2I; }
, 'M6Q': function (m6Q, t6Q) { return m6Q >= t6Q; }
, 'q6Q': function (L6Q, K6Q) { return L6Q - K6Q; }
, 'b9V': function (v9V, O9V) { return v9V == O9V; }
, 'G3Q': function (a3Q, F3Q) { return a3Q - F3Q; }
, 'Y3F': function (C3F, j3F) { return C3F >= j3F; }
, 'U4X': function (B4X, T4X) { return B4X / T4X; }
, 'c4I': function (V4I, q4I) { return V4I <= q4I; }
, 'B4c': function (T4c, w4c) { return T4c == w4c; }
, 'A2Q': function (z2Q, N2Q) { return z2Q < N2Q; }
, 'T0h': function (w0h, r0h) { return w0h * r0h; }
, 'F5c': function (S5c, Z5c) { return S5c >= Z5c; }
, 'O1F': function (l1F, u1F) { return l1F < u1F; }
, 'd8b': function (x8b, E8b) { return x8b / E8b; }
, 'a4N': function (F4N, S4N) { return F4N > S4N; }
, 'R1V': function (o1V, c2V) { return o1V != c2V; }
, 'B3b': function (T3b, w3b) { return T3b != w3b; }
, 'k0h': function (I0h, y0h) { return I0h * y0h; }
, 'd6c': function (x6c, E6c) { return x6c <= E6c; }
, 'f0X': function (s0X, d0X) { return s0X != d0X; }
, 'X9l': function (Q9l, h9l) { return Q9l == h9l; }
, 'i3N': function (G3N, a3N) { return G3N < a3N; }
, 'M1a': function (m1a, t1a) { return m1a == t1a; }
, 'I9h': function (y9h, J9h) { return y9h >= J9h; }
, 'y5N': function (J5N, W5N) { return J5N - W5N; }
, 'B5I': function (T5I, w5I) { return T5I < w5I; }
, 'X7N': function (Q7N, h7N) { return Q7N == h7N; }
, 'q8F': function (L8F, K8F) { return L8F == K8F; }
, 'C3l': function (j3l, H3l) { return j3l - H3l; }
, 'P0V': function (X0V, Q0V) { return X0V - Q0V; }
, 'R1b': function (o1b, c2b) { return o1b != c2b; }
, 'v8N': function (O8N, l8N) { return O8N > l8N; }
, 'C4N': function (j4N, H4N) { return j4N != H4N; }
, 'Z8N': function (A8N, z8N) { return A8N in z8N; }
, 'h0b': function (M0b, m0b) { return M0b - m0b; }
, 'u6N': function (g6N, R6N) { return g6N * R6N; }
, 'h0c': function (M0c, m0c) { return M0c == m0c; }
, 'm8l': function (t8l, D8l) { return t8l == D8l; }
, 'H2h': function (n2h, i2h) { return n2h >= i2h; }
, 'E9l': function (e9l, p9l) { return e9l == p9l; }
, 'w8V': function (r8V, k8V) { return r8V - k8V; }
, 'H1a': function (n1a, i1a) { return n1a == i1a; }
, 'P9X': function (X9X, Q9X) { return X9X / Q9X; }
, 'k4Q': function (I4Q, y4Q) { return I4Q !== y4Q; }
, 'm7X': function (t7X, D7X) { return t7X != D7X; }
, 'u6V': function (g6V, R6V) { return g6V > R6V; }
, 'A0I': function (z0I, N0I) { return z0I == N0I; }
, 'L9h': function (K9h, Y9h) { return K9h == Y9h; }
, 'h3V': function (M3V, m3V) { return M3V < m3V; }
, 'l9N': function (u9N, g9N) { return u9N >= g9N; }
, 'n7c': function (i7c, G7c) { return i7c / G7c; }
, 'u9h': function (g9h, R9h) { return g9h > R9h; }
, 'b5a': function (v5a, O5a) { return v5a == O5a; }
, 'q3c': function (L3c, K3c) { return L3c == K3c; }
, 'Z6I': function (A6I, z6I) { return A6I == z6I; }
, 'l7b': function (u7b, g7b) { return u7b == g7b; }
, 'l3c': function (u3c, g3c) { return u3c == g3c; }
, 'B0Q': function (T0Q, w0Q) { return T0Q > w0Q; }
, 'u7I': function (g7I, R7I) { return g7I === R7I; }
, 'Q6N': function (h6N, M6N) { return h6N < M6N; }
, 'o6I': function (c9I, V9I) { return c9I > V9I; }
, 'K9Q': function (Y9Q, C9Q) { return Y9Q < C9Q; }
, 'k7l': function (I7l, y7l, J7l) { return I7l * y7l * J7l; }
, 'Z8F': function (A8F, z8F) { return A8F == z8F; }
, 't6h': function (D6h, U6h) { return D6h < U6h; }
, 'u3F': function (g3F, R3F) { return g3F / R3F; }
, 'u4l': function (g4l, R4l) { return g4l < R4l; }
, 's9Q': function (d9Q, x9Q) { return d9Q < x9Q; }
, 'i6a': function (G6a, a6a) { return G6a == a6a; }
, 'v3l': function (O3l, l3l) { return O3l <= l3l; }
, 'd3l': function (x3l, E3l) { return x3l - E3l; }
, 'Z7X': function (A7X, z7X) { return A7X / z7X; }
, 'g9a': function (R9a, o9a) { return R9a == o9a; }
, 'W3l': function (f3l, s3l) { return f3l - s3l; }
, 'J7V': function (W7V, f7V) { return W7V / f7V; }
, 'o8N': function (c7N, V7N) { return c7N in V7N; }
, 'x8c': function (E8c, e8c) { return E8c - e8c; }
, 'R1I': function (o1I, c2I) { return o1I == c2I; }
, 'v7F': function (O7F, l7F) { return O7F - l7F; }
, 'G5a': function (a5a, F5a) { return a5a !== F5a; }
, 'Q2F': function (h2F, M2F) { return h2F == M2F; }
, 'q3X': function (L3X, K3X) { return L3X - K3X; }
, 'j3b': function (H3b, n3b) { return H3b < n3b; }
, 'e5Q': function (p5Q, b5Q) { return p5Q == b5Q; }
, 'Q5I': function (h5I, M5I, m5I) { return h5I / M5I * m5I; }
, 'i2I': function (G2I, a2I) { return G2I < a2I; }
, 'n4X': function (i4X, G4X) { return i4X / G4X; }
, 'w6c': function (r6c, k6c) { return r6c * k6c; }
, 'v6b': function (O6b, l6b) { return O6b & l6b; }
, 'v4I': function (O4I, l4I) { return O4I < l4I; }
, 'z6K': "3", 'n7F': function (i7F, G7F) { return i7F == G7F; }
, 'E1a': function (e1a, p1a) { return e1a < p1a; }
, 'f0a': function (s0a, d0a) { return s0a > d0a; }
, 'y0l': function (J0l, W0l) { return J0l == W0l; }
, 'X2h': function (Q2h, h2h) { return Q2h < h2h; }
, 'z9N': function (N9N, P9N) { return N9N == P9N; }
, 'K2Q': function (Y2Q, C2Q) { return Y2Q > C2Q; }
, 'x2a': function (E2a, e2a) { return E2a - e2a; }
, 'W5X': function (f5X, s5X) { return f5X != s5X; }
, 'x4h': function (E4h, e4h) { return E4h == e4h; }
, 'Q8V': function (h8V, M8V) { return h8V < M8V; }
, 'k3X': function (I3X, y3X) { return I3X - y3X; }
, 'n4b': function (i4b, G4b) { return i4b * G4b; }
, 'I9a': function (y9a, J9a) { return y9a == J9a; }
, 'x2b': function (E2b, e2b) { return E2b <= e2b; }
, 'k1V': function (I1V, y1V) { return I1V - y1V; }
, 'r8Q': function (k8Q, I8Q) { return k8Q <= I8Q; }
, 'A3V': function (z3V, N3V) { return z3V / N3V; }
, 'c5Q': function (V5Q, q5Q) { return V5Q == q5Q; }
, 'D4Q': function (U4Q, B4Q) { return U4Q < B4Q; }
, 'N8V': function (P8V, X8V) { return P8V !== X8V; }
, 't3V': function (D3V, U3V) { return D3V < U3V; }
, 'V2b': function (q2b, L2b) { return q2b * L2b; }
, 'z9c': function (N9c, P9c) { return N9c / P9c; }
, 'A4Q': function (z4Q, N4Q) { return z4Q == N4Q; }
, 'A1c': function (z1c, N1c) { return z1c - N1c; }
, 'P0a': function (X0a, Q0a) { return X0a == Q0a; }
, 'G9V': function (a9V, F9V) { return a9V == F9V; }
, 'y2a': function (J2a, W2a) { return J2a < W2a; }
, 'X5h': function (Q5h, h5h) { return Q5h != h5h; }
, 'm6c': function (t6c, D6c) { return t6c > D6c; }
, 'C1c': function (j1c, H1c) { return j1c / H1c; }
, 'Z4l': function (A4l, z4l) { return A4l == z4l; }
, 'w4a': function (r4a, k4a) { return r4a == k4a; }
, 'F1Z': 16, 'E6Q': function (e6Q, p6Q) { return e6Q - p6Q; }
, 'H7V': function (n7V, i7V) { return n7V < i7V; }
, 'w7c': function (r7c, k7c) { return r7c > k7c; }
, 'S7l': function (Z7l, A7l) { return Z7l == A7l; }
, 'h5c': function (M5c, m5c) { return M5c <= m5c; }
, 'e6b': function (p6b, b6b) { return p6b >= b6b; }
, 'a6N': function (F6N, S6N) { return F6N / S6N; }
, 'U9a': function (B9a, T9a) { return B9a != T9a; }
, 'o6i': null, 'e8a': function (p8a, b8a) { return p8a == b8a; }
, 'M2h': function (m2h, t2h) { return m2h == t2h; }
, 'b3c': function (v3c, O3c) { return v3c * O3c; }
, 'g8I': function (R8I, o8I) { return R8I - o8I; }
, 'a9a': function (F9a, S9a) { return F9a / S9a; }
, 'y3V': function (J3V, W3V) { return J3V / W3V; }
, 'I4a': function (y4a, J4a) { return y4a < J4a; }
, 'F2I': function (S2I, Z2I) { return S2I > Z2I; }
, 'z1b': function (N1b, P1b) { return N1b * P1b; }
, 'j6h': function (H6h, n6h) { return H6h > n6h; }
, 'f5c': function (s5c, d5c) { return s5c != d5c; }
, 'O2V': function (l2V, u2V) { return l2V > u2V; }
, 'v8b': function (O8b, l8b) { return O8b > l8b; }
, 'G9l': function (a9l, F9l) { return a9l == F9l; }
, 'K4h': function (Y4h, C4h) { return Y4h == C4h; }
, 'b5h': function (v5h, O5h) { return v5h > O5h; }
, 'H6Q': function (n6Q, i6Q) { return n6Q - i6Q; }
, 'D7V': function (U7V, B7V) { return U7V == B7V; }
, 'Z6c': function (A6c, z6c) { return A6c < z6c; }
, 'X3Q': function (Q3Q, h3Q, M3Q) { return Q3Q * h3Q / M3Q; }
, 'Q4N': function (h4N, M4N) { return h4N - M4N; }
, 'S7b': function (Z7b, A7b) { return Z7b == A7b; }
, 'V2I': function (q2I, L2I) { return q2I == L2I; }
, 'B9X': function (T9X, w9X) { return T9X == w9X; }
, 'M2X': function (m2X, t2X) { return m2X != t2X; }
, 'p2V': function (b2V, v2V) { return b2V == v2V; }
, 'm7F': function (t7F, D7F) { return t7F == D7F; }
, 'S3F': function (Z3F, A3F) { return Z3F <= A3F; }
, 's7N': function (d7N, x7N) { return d7N >= x7N; }
, 'V0V': function (q0V, L0V) { return q0V < L0V; }
, 'y1c': function (J1c, W1c, f1c) { return J1c - W1c + f1c; }
, 'z9V': function (N9V, P9V) { return N9V - P9V; }
, 'h0V': function (M0V, m0V) { return M0V in m0V; }
, 'v4b': function (O4b, l4b) { return O4b < l4b; }
, 's7b': function (d7b, x7b) { return d7b != x7b; }
, 'F5b': function (S5b, Z5b) { return S5b & Z5b; }
, 'y8Q': function (J8Q, W8Q) { return J8Q / W8Q; }
, 'o7B': 3, 'g2Q': function (R2Q, o2Q) { return R2Q >= o2Q; }
, 'L1h': function (K1h, Y1h) { return K1h != Y1h; }
, 'q3Q': function (L3Q, K3Q) { return L3Q == K3Q; }
, 'j2l': function (H2l, n2l) { return H2l - n2l; }
, 'r2b': function (k2b, I2b) { return k2b <= I2b; }
, 'f2l': function (s2l, d2l) { return s2l > d2l; }
, 'L8b': function (K8b, Y8b) { return K8b / Y8b; }
, 'C4b': function (j4b, H4b) { return j4b - H4b; }
, 'G7V': function (a7V, F7V) { return a7V != F7V; }
, 'b1V': function (v1V, O1V) { return v1V - O1V; }
, 'K2N': function (Y2N, C2N) { return Y2N < C2N; }
, 'Z7F': function (A7F, z7F) { return A7F / z7F; }
, 'g3V': function (R3V, o3V) { return R3V / o3V; }
, 'c4a': function (V4a, q4a) { return V4a < q4a; }
, 'c7c': function (V7c, q7c) { return V7c - q7c; }
, 'u6b': function (g6b, R6b) { return g6b != R6b; }
, 'I1h': function (y1h, J1h) { return y1h >= J1h; }
, 'O8X': function (l8X, u8X) { return l8X / u8X; }
, 'I6b': function (y6b, J6b) { return y6b & J6b; }
, 'C0a': function (j0a, H0a) { return j0a != H0a; }
, 'S7a': function (Z7a, A7a) { return Z7a * A7a; }
, 'V0Q': function (q0Q, L0Q) { return q0Q > L0Q; }
, 'M1X': function (m1X, t1X) { return m1X == t1X; }
, 'g5b': function (R5b, o5b) { return R5b < o5b; }
, 'U7X': function (B7X, T7X) { return B7X * T7X; }
, 'i2c': function (G2c, a2c) { return G2c / a2c; }
, 'a8Q': function (F8Q, S8Q) { return F8Q > S8Q; }
, 'k1l': function (I1l, y1l) { return I1l * y1l; }
, 'x3N': function (E3N, e3N) { return E3N == e3N; }
, 'm1h': function (t1h, D1h) { return t1h / D1h; }
, 'l9b': function (u9b, g9b) { return u9b <= g9b; }
, 'B8h': function (T8h, w8h) { return T8h != w8h; }
, 'E2c': function (e2c, p2c) { return e2c * p2c; }
, 'l8l': function (u8l, g8l) { return u8l == g8l; }
, 'w6N': function (r6N, k6N) { return r6N > k6N; }
, 'w3l': function (r3l, k3l) { return r3l - k3l; }
, 'h2N': function (M2N, m2N) { return M2N - m2N; }
, 'w8I': function (r8I, k8I) { return r8I - k8I; }
, 'I8N': function (y8N, J8N) { return y8N * J8N; }
, 'x2I': function (E2I, e2I) { return E2I == e2I; }
, 'v6I': function (O6I, l6I) { return O6I == l6I; }
, 'r2Q': function (k2Q, I2Q) { return k2Q < I2Q; }
, 'C6l': function (j6l, H6l) { return j6l == H6l; }
, 'I6l': function (y6l, J6l) { return y6l == J6l; }
, 'o8a': function (c7a, V7a) { return c7a >= V7a; }
, 'p0Q': function (b0Q, v0Q) { return b0Q == v0Q; }
, 'W8F': function (f8F, s8F) { return f8F < s8F; }
, 'R1l': function (o1l, c2l) { return o1l == c2l; }
, 'W8b': function (f8b, s8b) { return f8b > s8b; }
, 'a5X': function (F5X, S5X) { return F5X * S5X; }
, 'x0V': function (E0V, e0V) { return E0V != e0V; }
, 'o6b': function (c9b, V9b) { return c9b < V9b; }
, 'm2F': function (t2F, D2F) { return t2F == D2F; }
, 'n4l': function (i4l, G4l) { return i4l > G4l; }
, 'J6X': function (W6X, f6X) { return W6X > f6X; }
, 'h3a': function (M3a, m3a) { return M3a - m3a; }
, 'a7c': function (F7c, S7c) { return F7c != S7c; }
, 'x8Q': function (E8Q, e8Q) { return E8Q - e8Q; }
, 'k9l': function (I9l, y9l) { return I9l == y9l; }
, 'X1l': function (Q1l, h1l) { return Q1l <= h1l; }
, 'h5N': function (M5N, m5N) { return M5N * m5N; }
, 'A3a': function (z3a, N3a) { return z3a - N3a; }
, 't0Q': function (D0Q, U0Q) { return D0Q * U0Q; }
, 'O0V': function (l0V, u0V) { return l0V < u0V; }
, 'J1N': function (W1N, f1N) { return W1N != f1N; }
, 'e9h': function (p9h, b9h) { return p9h <= b9h; }
, 'y5I': function (J5I, W5I) { return J5I / W5I; }
, 'r2V': function (k2V, I2V) { return k2V == I2V; }
, 'G9b': function (a9b, F9b) { return a9b - F9b; }
, 'o8V': function (c7V, V7V) { return c7V != V7V; }
, 'R1a': function (o1a, c2a) { return o1a > c2a; }
, 'l7N': function (u7N, g7N) { return u7N <= g7N; }
, 'X1I': function (Q1I, h1I) { return Q1I == h1I; }
, 's3X': function (d3X, x3X) { return d3X - x3X; }
, 'c9h': function (V9h, q9h) { return V9h * q9h; }
, 'i5N': function (G5N, a5N) { return G5N == a5N; }
, 'z9Q': function (N9Q, P9Q) { return N9Q < P9Q; }
, 'a8N': function (F8N, S8N) { return F8N * S8N; }
, 'a5Z': "s", 'W3Q': function (f3Q, s3Q) { return f3Q != s3Q; }
, 'g5N': function (R5N, o5N) { return R5N - o5N; }
, 'R5h': function (o5h, c6h) { return o5h > c6h; }
, 'B5l': function (T5l, w5l) { return T5l == w5l; }
, 'v3Q': function (O3Q, l3Q) { return O3Q < l3Q; }
, 'g7l': function (R7l, o7l) { return R7l < o7l; }
, 'A8h': function (z8h, N8h) { return z8h < N8h; }
, 'd6V': function (x6V, E6V) { return x6V == E6V; }
, 'j9Q': function (H9Q, n9Q, i9Q) { return H9Q - n9Q + i9Q; }
, 'q3I': function (L3I, K3I) { return L3I === K3I; }
, 'A6h': function (z6h, N6h) { return z6h <= N6h; }
, 'L8I': function (K8I, Y8I) { return K8I - Y8I; }
, 'M9V': function (m9V, t9V) { return m9V >= t9V; }
, 'v6c': function (O6c, l6c) { return O6c / l6c; }
, 'N9h': function (P9h, X9h) { return P9h < X9h; }
, 'D2c': function (U2c, B2c) { return U2c / B2c; }
, 'R3I': function (o3I, c5l) { return o3I == c5l; }
, 'C8V': function (j8V, H8V) { return j8V == H8V; }
, 'Y1V': function (C1V, j1V) { return C1V == j1V; }
, 'd6N': function (x6N, E6N) { return x6N < E6N; }
, 'E7V': function (e7V, p7V) { return e7V < p7V; }
, 'J4Q': function (W4Q, f4Q) { return W4Q * f4Q; }
, 'G1X': function (a1X, F1X) { return a1X - F1X; }
, 'O2l': function (l2l, u2l) { return l2l == u2l; }
, 'y0V': function (J0V, W0V) { return J0V < W0V; }
, 'S1a': function (Z1a, A1a) { return Z1a == A1a; }
, 'p8I': function (b8I, v8I) { return b8I >= v8I; }
, 'i3V': function (G3V, a3V) { return G3V / a3V; }
, 'E5h': function (e5h, p5h) { return e5h - p5h; }
, 'D1I': function (U1I, B1I) { return U1I == B1I; }
, 'U7c': function (B7c, T7c) { return B7c > T7c; }
, 'U7h': function (B7h, T7h) { return B7h < T7h; }
, 'L0X': function (K0X, Y0X) { return K0X == Y0X; }
, 'h0l': function (M0l, m0l) { return M0l == m0l; }
, 'a3l': function (F3l, S3l) { return F3l - S3l; }
, 'I5V': function (y5V, J5V) { return y5V < J5V; }
, 'b1b': function (v1b, O1b) { return v1b < O1b; }
, 'N7X': function (P7X, X7X) { return P7X / X7X; }
, 'T1Q': function (w1Q, r1Q) { return w1Q == r1Q; }
, 'M7b': function (m7b, t7b) { return m7b == t7b; }
, 'p3a': function (b3a, v3a) { return b3a == v3a; }
, 'n4N': function (i4N, G4N) { return i4N - G4N; }
, 'S9b': function (Z9b, A9b) { return Z9b < A9b; }
, 'H5a': function (n5a, i5a) { return n5a in i5a; }
, 'f1F': function (s1F, d1F) { return s1F == d1F; }
, 'p0I': function (b0I, v0I) { return b0I - v0I; }
, 'Z6V': function (A6V, z6V) { return A6V == z6V; }
, 'K2a': function (Y2a, C2a) { return Y2a < C2a; }
, 'Z4b': function (A4b, z4b) { return A4b < z4b; }
, 'k9Q': function (I9Q, y9Q) { return I9Q == y9Q; }
, 'U4a': function (B4a, T4a) { return B4a < T4a; }
, 'l9Q': function (u9Q, g9Q) { return u9Q - g9Q; }
, 'c7h': function (V7h, q7h) { return V7h != q7h; }
, 'l9l': function (u9l, g9l) { return u9l == g9l; }
, 'v7X': function (O7X, l7X) { return O7X <= l7X; }
, 'n1Z': 17, 'k2X': function (I2X, y2X) { return I2X > y2X; }
, 'k2c': function (I2c, y2c) { return I2c - y2c; }
, 'V2N': function (q2N, L2N) { return q2N > L2N; }
, 'Y1X': function (C1X, j1X) { return C1X / j1X; }
, 's3I': function (d3I, x3I) { return d3I == x3I; }
, 'G9c': function (a9c, F9c) { return a9c <= F9c; }
, 'p2b': function (b2b, v2b) { return b2b == v2b; }
, 'f5b': function (s5b, d5b) { return s5b * d5b; }
, 'u5Q': function (g5Q, R5Q) { return g5Q < R5Q; }
, 'm9h': function (t9h, D9h) { return t9h <= D9h; }
, 'p5I': function (b5I, v5I) { return b5I == v5I; }
, 'Z8b': function (A8b, z8b) { return A8b / z8b; }
, 'A0l': function (z0l, N0l) { return z0l == N0l; }
, 's3c': function (d3c, x3c) { return d3c == x3c; }
, 'a6V': function (F6V, S6V) { return F6V == S6V; }
, 'P2a': function (X2a, Q2a) { return X2a == Q2a; }
, 'P3b': function (X3b, Q3b) { return X3b * Q3b; }
, 'C5V': function (j5V, H5V) { return j5V == H5V; }
, 'P8X': function (X8X, Q8X) { return X8X < Q8X; }
, 'u5X': function (g5X, R5X) { return g5X != R5X; }
, 'Y6X': function (C6X, j6X) { return C6X == j6X; }
, 'x6a': function (E6a, e6a) { return E6a == e6a; }
, 'Z8I': function (A8I, z8I) { return A8I - z8I; }
, 'V6a': function (q6a, L6a) { return q6a == L6a; }
, 'T6X': function (w6X, r6X) { return w6X > r6X; }
, 'C4l': function (j4l, H4l) { return j4l < H4l; }
, 'R4Q': function (o4Q, c1Q) { return o4Q < c1Q; }
, 'L4N': function (K4N, Y4N) { return K4N == Y4N; }
, 'U8I': function (B8I, T8I) { return B8I >= T8I; }
, 'v8F': function (O8F, l8F) { return O8F > l8F; }
, 'X0h': function (Q0h, h0h) { return Q0h == h0h; }
, 'C8b': function (j8b, H8b) { return j8b < H8b; }
, 'r1c': function (k1c, I1c) { return k1c - I1c; }
, 'R9l': function (o9l, c0l) { return o9l == c0l; }
, 'D9l': function (U9l, B9l) { return U9l == B9l; }
, 'O0I': function (l0I, u0I) { return l0I == u0I; }
, 'i2l': function (G2l, a2l) { return G2l > a2l; }
, 't4h': function (D4h, U4h) { return D4h == U4h; }
, 'M4Q': function (m4Q, t4Q) { return m4Q > t4Q; }
, 'U5Q': function (B5Q, T5Q) { return B5Q == T5Q; }
, 'd7X': function (x7X, E7X) { return x7X == E7X; }
, 'P4Q': function (X4Q, Q4Q, h4Q) { return X4Q * Q4Q / h4Q; }
, 'A0N': function (z0N, N0N) { return z0N >= N0N; }
, 'T2h': function (w2h, r2h) { return w2h > r2h; }
, 'H7b': function (n7b, i7b) { return n7b * i7b; }
, 'P6h': function (X6h, Q6h) { return X6h - Q6h; }
, 'K9X': function (Y9X, C9X) { return Y9X == C9X; }
, 'f2a': function (s2a, d2a) { return s2a - d2a; }
, 'g4c': function (R4c, o4c) { return R4c > o4c; }
, 'Q4X': function (h4X, M4X) { return h4X / M4X; }
, 'q7b': function (L7b, K7b) { return L7b - K7b; }
, 'U8V': function (B8V, T8V) { return B8V < T8V; }
, 'n6I': function (i6I, G6I) { return i6I == G6I; }
, 'I4N': function (y4N, J4N) { return y4N < J4N; }
, 'f3V': function (s3V, d3V) { return s3V / d3V; }
, 'J9b': function (W9b, f9b) { return W9b / f9b; }
, 'v6V': function (O6V, l6V) { return O6V * l6V; }
, 'V1Q': function (q1Q, L1Q) { return q1Q / L1Q; }
, 'l0h': function (u0h, g0h) { return u0h - g0h; }
, 'Z9h': function (A9h, z9h) { return A9h >= z9h; }
, 'w5X': function (r5X, k5X) { return r5X != k5X; }
, 'P0N': function (X0N, Q0N) { return X0N >= Q0N; }
, 'i0c': function (G0c, a0c) { return G0c / a0c; }
, 'H1N': function (n1N, i1N) { return n1N < i1N; }
, 't2a': function (D2a, U2a) { return D2a < U2a; }
, 'g8h': function (R8h, o8h) { return R8h != o8h; }
, 'Y3I': function (C3I, j3I) { return C3I === j3I; }
, 'd8I': function (x8I, E8I, e8I) { return x8I - E8I - e8I; }
, 'j2b': function (H2b, n2b) { return H2b == n2b; }
, 'B0c': function (T0c, w0c) { return T0c != w0c; }
, 'X7a': function (Q7a, h7a) { return Q7a == h7a; }
, 'V5c': function (q5c, L5c) { return q5c != L5c; }
, 'W4X': function (f4X, s4X) { return f4X <= s4X; }
, 'V6h': function (q6h, L6h) { return q6h < L6h; }
, 'W4N': function (f4N, s4N) { return f4N != s4N; }
, 'Q4a': function (h4a, M4a) { return h4a == M4a; }
, 's1N': function (d1N, x1N) { return d1N != x1N; }
, 'q1X': function (L1X, K1X) { return L1X / K1X; }
, 'r6a': function (k6a, I6a) { return k6a > I6a; }
, 'd6l': function (x6l, E6l) { return x6l == E6l; }
, 'L4X': function (K4X, Y4X) { return K4X * Y4X; }
, 'L6c': function (K6c, Y6c) { return K6c > Y6c; }
, 'b9b': function (v9b, O9b) { return v9b * O9b; }
, 'y4h': function (J4h, W4h) { return J4h === W4h; }
, 'B3a': function (T3a, w3a) { return T3a * w3a; }
, 'X3F': function (Q3F, h3F) { return Q3F * h3F; }
, 'j3N': function (H3N, n3N) { return H3N > n3N; }
, 'M1I': function (m1I, t1I) { return m1I <= t1I; }
, 'r6h': function (k6h, I6h) { return k6h - I6h; }
, 'p3V': function (b3V, v3V) { return b3V - v3V; }
, 'D0h': function (U0h, B0h) { return U0h < B0h; }
, 'D6X': function (U6X, B6X) { return U6X > B6X; }
, 'y2V': function (J2V, W2V) { return J2V == W2V; }
, 'k7V': function (I7V, y7V) { return I7V == y7V; }
, 'O5I': function (l5I, u5I) { return l5I > u5I; }
, 'm5Q': function (t5Q, D5Q) { return t5Q == D5Q; }
, 'g2V': function (R2V, o2V) { return R2V >= o2V; }
, 'g2N': function (R2N, o2N) { return R2N != o2N; }
, 'V2a': function (q2a, L2a) { return q2a > L2a; }
, 'w4N': function (r4N, k4N) { return r4N != k4N; }
, 'q9b': function (L9b, K9b) { return L9b > K9b; }
, 'm6N': function (t6N, D6N) { return t6N < D6N; }
, 'P2V': function (X2V, Q2V) { return X2V != Q2V; }
, 'd8a': function (x8a, E8a) { return x8a < E8a; }
, 'G2h': function (a2h, F2h) { return a2h <= F2h; }
, 'S9I': function (Z9I, A9I) { return Z9I == A9I; }
, 'g8X': function (R8X, o8X) { return R8X < o8X; }
, 'h9X': function (M9X, m9X) { return M9X - m9X; }
, 'Z0X': function (A0X, z0X) { return A0X - z0X; }
, 't3b': function (D3b, U3b) { return D3b != U3b; }
, 'j2N': function (H2N, n2N) { return H2N - n2N; }
, 'N8Q': function (P8Q, X8Q) { return P8Q >= X8Q; }
, 'L7X': function (K7X, Y7X) { return K7X < Y7X; }
, 'S3I': function (Z3I, A3I) { return Z3I === A3I; }
, 'p5l': function (b5l, v5l) { return b5l == v5l; }
, 'c4N': function (V4N, q4N) { return V4N < q4N; }
, 'a5V': function (F5V, S5V) { return F5V < S5V; }
, 'W4a': function (f4a, s4a) { return f4a == s4a; }
, 'j2V': function (H2V, n2V) { return H2V == n2V; }
, 'R9N': function (o9N, c0N) { return o9N >= c0N; }
, 'Z7Q': function (A7Q, z7Q) { return A7Q == z7Q; }
, 'L6b': function (K6b, Y6b) { return K6b > Y6b; }
, 'z3F': function (N3F, P3F) { return N3F == P3F; }
, 'D5h': function (U5h, B5h) { return U5h == B5h; }
, 'X6Q': function (Q6Q, h6Q) { return Q6Q - h6Q; }
, 'o9h': function (c0h, V0h) { return c0h > V0h; }
, 'B0l': function (T0l, w0l) { return T0l == w0l; }
, 'Q7Q': function (h7Q, M7Q) { return h7Q == M7Q; }
, 'C6b': function (j6b, H6b) { return j6b >= H6b; }
, 'z6X': function (N6X, P6X) { return N6X - P6X; }
, 'E1X': function (e1X, p1X) { return e1X * p1X; }
, 'I4I': function (y4I, J4I) { return y4I < J4I; }
, 'O8I': function (l8I, u8I) { return l8I - u8I; }
, 'a8a': function (F8a, S8a) { return F8a - S8a; }
, 'p8Q': function (b8Q, v8Q) { return b8Q / v8Q; }
, 'o7Q': function (c3Q, V3Q) { return c3Q - V3Q; }
, 'j5b': function (H5b, n5b) { return H5b & n5b; }
, 'Y3c': function (C3c, j3c) { return C3c > j3c; }
, 'g6a': function (R6a, o6a) { return R6a == o6a; }
, 'E1c': function (e1c, p1c) { return e1c / p1c; }
, 't0b': function (D0b, U0b) { return D0b - U0b; }
, 'y8X': function (J8X, W8X) { return J8X - W8X; }
, 'B2l': function (T2l, w2l) { return T2l - w2l; }
, 'j3V': function (H3V, n3V) { return H3V == n3V; }
, 'h4h': function (M4h, m4h) { return M4h < m4h; }
, 'Q4l': function (h4l, M4l) { return h4l / M4l; }
, 'W6I': function (f6I, s6I) { return f6I < s6I; }
, 'I4X': function (y4X, J4X) { return y4X / J4X; }
, 'H3I': function (n3I, i3I) { return n3I === i3I; }
, 'T9V': function (w9V, r9V) { return w9V <= r9V; }
, 'B6a': function (T6a, w6a) { return T6a == w6a; }
, 'k7b': function (I7b, y7b) { return I7b == y7b; }
, 'h2I': function (M2I, m2I) { return M2I > m2I; }
, 'V3a': function (q3a, L3a) { return q3a < L3a; }
, 'G6X': function (a6X, F6X) { return a6X < F6X; }
, 'd2F': function (x2F, E2F) { return x2F == E2F; }
, 'Y1I': function (C1I, j1I) { return C1I <= j1I; }
, 'C8N': function (j8N, H8N) { return j8N / H8N; }
, 'c8I': function (V8I, q8I) { return V8I < q8I; }
, 'd4a': function (x4a, E4a) { return x4a - E4a; }
, 'U4V': function (B4V, T4V) { return B4V < T4V; }
, 'C7Q': function (j7Q, H7Q) { return j7Q - H7Q; }
, 'H8F': function (n8F, i8F, G8F) { return n8F * i8F / G8F; }
, 'G1V': function (a1V, F1V) { return a1V < F1V; }
, 'i4Q': function (G4Q, a4Q) { return G4Q < a4Q; }
, 'D5a': function (U5a, B5a) { return U5a != B5a; }
, 'V4Q': function (q4Q, L4Q) { return q4Q - L4Q; }
, 'z6Q': function (N6Q, P6Q) { return N6Q / P6Q; }
, 'E1b': function (e1b, p1b) { return e1b == p1b; }
, 's9c': function (d9c, x9c) { return d9c - x9c; }
, 'n7h': function (i7h, G7h) { return i7h < G7h; }
, 'B2Q': function (T2Q, w2Q) { return T2Q < w2Q; }
, 'O2Q': function (l2Q, u2Q) { return l2Q - u2Q; }
, 'p0V': function (b0V, v0V) { return b0V < v0V; }
, 'y5l': function (J5l, W5l) { return J5l == W5l; }
, 'i5l': function (G5l, a5l) { return G5l == a5l; }
, 'A2a': function (z2a, N2a) { return z2a < N2a; }
, 'm3l': function (t3l, D3l) { return t3l - D3l; }
, 'h8c': function (M8c, m8c) { return M8c == m8c; }
, 'c6N': function (V6N, q6N) { return V6N == q6N; }
, 'U7F': function (B7F, T7F) { return B7F == T7F; }
, 'h5b': function (M5b, m5b) { return M5b >= m5b; }
, 'X7b': function (Q7b, h7b) { return Q7b == h7b; }
, 'o4I': function (c1I, V1I) { return c1I == V1I; }
, 'I7I': function (y7I, J7I) { return y7I - J7I; }
, 'f8c': function (s8c, d8c) { return s8c == d8c; }
, 'm8Q': function (t8Q, D8Q) { return t8Q < D8Q; }
, 'r4c': function (k4c, I4c) { return k4c == I4c; }
, 'P4h': function (X4h, Q4h) { return X4h >= Q4h; }
, 'y0c': function (J0c, W0c) { return J0c < W0c; }
, 'U4N': function (B4N, T4N) { return B4N / T4N; }
, 'L6I': function (K6I, Y6I) { return K6I - Y6I; }
, 'r8c': function (k8c, I8c) { return k8c - I8c; }
, 'b9Q': function (v9Q, O9Q) { return v9Q * O9Q; }
, 'w6l': function (r6l, k6l) { return r6l == k6l; }
, 'D9V': function (U9V, B9V) { return U9V <= B9V; }
, 'e7c': function (p7c, b7c) { return p7c * b7c; }
, 'R7b': function (o7b, c3b) { return o7b == c3b; }
, 'L8V': function (K8V, Y8V) { return K8V * Y8V; }
, 'd6I': function (x6I, E6I) { return x6I / E6I; }
, 'X9c': function (Q9c, h9c) { return Q9c - h9c; }
, 't2V': function (D2V, U2V) { return D2V == U2V; }
, 'Q7h': function (h7h, M7h) { return h7h < M7h; }
, 'i8X': function (G8X, a8X) { return G8X / a8X; }
, 'j4h': function (H4h, n4h) { return H4h > n4h; }
, 'h8h': function (M8h, m8h) { return M8h <= m8h; }
, 'x0a': function (E0a, e0a) { return E0a < e0a; }
, 'K5l': function (Y5l, C5l) { return Y5l == C5l; }
, 'v7c': function (O7c, l7c) { return O7c * l7c; }
, 'y6h': function (J6h, W6h) { return J6h > W6h; }
, 't8X': function (D8X, U8X) { return D8X == U8X; }
, 'p8h': function (b8h, v8h) { return b8h - v8h; }
, 'n0X': function (i0X, G0X) { return i0X == G0X; }
, 'P2b': function (X2b, Q2b) { return X2b < Q2b; }
, 'N6l': function (P6l, X6l) { return P6l == X6l; }
, 'l1l': function (u1l, g1l) { return u1l - g1l; }
, 'n8Q': function (i8Q, G8Q) { return i8Q < G8Q; }
, 'r3a': function (k3a, I3a) { return k3a > I3a; }
, 'Q8F': function (h8F, M8F) { return h8F == M8F; }
, 'i1Q': function (G1Q, a1Q) { return G1Q * a1Q; }
, 'l6Q': function (u6Q, g6Q) { return u6Q < g6Q; }
, 'U4b': function (B4b, T4b) { return B4b * T4b; }
, 'R7V': function (o7V, c3V) { return o7V / c3V; }
, 'F0V': function (S0V, Z0V) { return S0V == Z0V; }
, 'S3X': function (Z3X, A3X) { return Z3X * A3X; }
, 'E5a': function (e5a, p5a) { return e5a == p5a; }
, 'l1c': function (u1c, g1c) { return u1c - g1c; }
, 'o5X': function (c6X, V6X) { return c6X * V6X; }
, 'm4N': function (t4N, D4N) { return t4N - D4N; }
, 'Y1l': function (C1l, j1l) { return C1l - j1l; }
, 'U9h': function (B9h, T9h) { return B9h > T9h; }
, 'Z4N': function (A4N, z4N) { return A4N * z4N; }
, 'b7b': function (v7b, O7b) { return v7b == O7b; }
, 'I8F': function (y8F, J8F) { return y8F * J8F; }
, 'G7b': function (a7b, F7b) { return a7b == F7b; }
, 'K0l': function (Y0l, C0l) { return Y0l == C0l; }
, 'e8b': function (p8b, b8b) { return p8b < b8b; }
, 's5h': function (d5h, x5h) { return d5h - x5h; }
, 'c7X': function (V7X, q7X) { return V7X - q7X; }
, 'J9l': function (W9l, f9l) { return W9l == f9l; }
, 'Z4V': function (A4V, z4V) { return A4V <= z4V; }
, 'x0X': function (E0X, e0X) { return E0X / e0X; }
, 'A0a': function (z0a, N0a) { return z0a == N0a; }
, 'E7N': function (e7N, p7N) { return e7N == p7N; }
, 'N7Q': function (P7Q, X7Q) { return P7Q - X7Q; }
, 'i0b': function (G0b, a0b) { return G0b < a0b; }
, 'T2X': function (w2X, r2X) { return w2X == r2X; }
, 'j3a': function (H3a, n3a) { return H3a == n3a; }
, 'g5c': function (R5c, o5c) { return R5c == o5c; }
, 'd4l': function (x4l, E4l) { return x4l > E4l; }
, 'y2l': function (J2l, W2l) { return J2l - W2l; }
, 'Y3B': 0, 'g1F': function (R1F, o1F) { return R1F < o1F; }
, 'S6X': function (Z6X, A6X) { return Z6X != A6X; }
, 'U8l': function (B8l, T8l, w8l) { return B8l * T8l / w8l; }
, 'Y8F': function (C8F, j8F) { return C8F == j8F; }
, 'J9N': function (W9N, f9N) { return W9N > f9N; }
, 'A2V': function (z2V, N2V) { return z2V == N2V; }
, 'l4Q': function (u4Q, g4Q) { return u4Q != g4Q; }
, 'g2l': function (R2l, o2l) { return R2l == o2l; }
, 'T7b': function (w7b, r7b) { return w7b == r7b; }
, 'd3Q': function (x3Q, E3Q) { return x3Q != E3Q; }
, 'Q7c': function (h7c, M7c) { return h7c < M7c; }
, 'D1V': function (U1V, B1V) { return U1V - B1V; }
, 'L5V': function (K5V, Y5V) { return K5V == Y5V; }
, 'g61': (function () {
	var c91 = (5.2E1 > (6.60E1, 1) ? (58.90E1, 0) : (52.1E1, 36.0E1)), V91 = '', q91 = ['', NaN, NaN, NaN, NaN, (0x1CE < (118., 1.2E3) ? (39.6E1, null) : (9.8E1, 11.540E2)), / /, NaN, -(5.72E2 <= (131, 0x219) ? 'l' : 1.297E3 > (0x76, 57.30E1) ? (112.5E1, 1) : 0x244 >= (0x241, 89.4E1) ? "MA2" : (61.30E1, 123.)), -((4.36E2, 97.80E1) < (4.51E2, 121.) ? 85. : (6.640E2, 133) < 99. ? 32 : (124., 0x103) >= 39 ? (117., 1) : (4, 15.4E1)), / /, -((115.0E1, 6.94E2) >= (52.2E1, 1.48E3) ? (0x38, "B") : 0. > (21, 12.8E1) ? 0x88 : 10.22E2 >= (0x146, 144.) ? (52.40E1, 1) : (76.60E1, 27.)), ((0x1C2, 7.17E2) > (12.4E2, 71.) ? (16, null) : (0x224, 68.0E1) <= (0x197, 19.) ? .1 : (0x203, 40) >= (71., 43) ? (0x168, 0x176) : (25.40E1, 0.)), ((87.80E1, 26) >= (0x238, 0x122) ? 0x5B : (108, 0x1C2) >= (6.060E2, 70.) ? (121, null) : 131 > (0x25, 0x143) ? (0x5B, 0x225) : (59.2E1, 19.0E1)), ((0x244, 0x8B) >= 1.69E2 ? 35 : (134, 130.) < 0xE9 ? (0xC3, null) : (1.333E3, 6.5E2)), NaN, ((0x8E, 8.22E2) <= 49. ? (128., "w") : (1.92E2, 0x71) >= (0x8, 86.) ? (0x1C2, null) : (0x221, 6.850E2)), ((14.74E2, 146.) <= (144, 135.) ? "#" : 0x8 < (0xD9, 4.44E2) ? (149, null) : (0x200, 57.90E1)), NaN, NaN, [], [], '', [], [], '', '', [], '', false, false, [], false, '', [], [], [], [], [], null, ((0xF, 71.4E1) > 77.5E1 ? 'a' : 11.8E1 <= (0x138, 42.) ? 104. : 119.30E1 > (0, 0x13C) ? (0x7E, null) : (102.4E1, 0x1D3))], L91 = q91["length"]; for (; c91 < L91;) { V91 += +(typeof q91[c91++] !== 'object'); }
	var K91 = parseInt(V91, 2), Y91 = 'http://localhost?q=;%29%28emiTteg.%29%28etaD%20wen%20nruter', C91 = Y91.constructor.constructor(unescape(/;.+/["exec"](Y91))["split"]('')["reverse"]()["join"](''))(); return {
		R61: function (j91) {
			var H91, c91 = 0, n91 = K91 - C91 > L91, i91; for (; c91 < j91["length"]; c91++) { i91 = parseInt(j91["charAt"](c91), 16)["toString"](2); var G91 = i91["charAt"](i91["length"] - 1); H91 = c91 === ((53., 2.07E2) >= 0xD6 ? '\n' : (4, 0x15E) > (0x154, 111) ? (1.24E2, 0) : (67, 48)) ? G91 : H91 ^ G91; }
			return H91 ? n91 : !n91;
		}
	}
	;
}
)(), 'M1V': function (m1V, t1V) { return m1V / t1V; }
, 'A0V': function (z0V, N0V) { return z0V > N0V; }
, 'F2Q': function (S2Q, Z2Q) { return S2Q == Z2Q; }
, 'Y9l': function (C9l, j9l) { return C9l == j9l; }
, 'Z4X': function (A4X, z4X) { return A4X / z4X; }
, 'k1I': function (I1I, y1I) { return I1I / y1I; }
, 'M9Q': function (m9Q, t9Q) { return m9Q < t9Q; }
, 't8h': function (D8h, U8h) { return D8h != U8h; }
, 'a0X': function (F0X, S0X) { return F0X == S0X; }
, 's2X': function (d2X, x2X) { return d2X == x2X; }
, 'o3Q': function (c5a, V5a) { return c5a == V5a; }
, 'N8b': function (P8b, X8b) { return P8b < X8b; }
, 'v2F': function (O2F, l2F) { return O2F > l2F; }
, 'Q5V': function (h5V, M5V) { return h5V / M5V; }
, 'Q8a': function (h8a, M8a) { return h8a > M8a; }
, 'y2Q': function (J2Q, W2Q) { return J2Q > W2Q; }
, 'i6h': function (G6h, a6h) { return G6h < a6h; }
, 'J5a': function (W5a, f5a) { return W5a == f5a; }
, 'h0Q': function (M0Q, m0Q) { return M0Q * m0Q; }
, 'r5I': function (k5I, I5I) { return k5I < I5I; }
, 'E9Q': function (e9Q, p9Q) { return e9Q * p9Q; }
, 'y0b': function (J0b, W0b) { return J0b & W0b; }
, 's2h': function (d2h, x2h) { return d2h > x2h; }
, 'c9a': function (V9a, q9a) { return V9a <= q9a; }
, 'L4l': function (K4l, Y4l) { return K4l < Y4l; }
, 'c4X': function (V4X, q4X) { return V4X * q4X; }
, 'G7a': function (a7a, F7a) { return a7a == F7a; }
, 'a4I': function (F4I, S4I) { return F4I == S4I; }
, 'Q8b': function (h8b, M8b) { return h8b > M8b; }
, 'N3l': function (P3l, X3l) { return P3l < X3l; }
, 'h4c': function (M4c, m4c) { return M4c - m4c; }
, 'P0c': function (X0c, Q0c) { return X0c < Q0c; }
, 'h2b': function (M2b, m2b) { return M2b > m2b; }
, 'F8h': function (S8h, Z8h) { return S8h - Z8h; }
, 'd5Q': function (x5Q, E5Q) { return x5Q <= E5Q; }
, 'u6I': function (g6I, R6I) { return g6I == R6I; }
, 'd8N': function (x8N, E8N) { return x8N / E8N; }
, 'E1I': function (e1I, p1I) { return e1I - p1I; }
, 'K2l': function (Y2l, C2l) { return Y2l > C2l; }
, 'G9I': function (a9I, F9I) { return a9I == F9I; }
, 'b4Q': function (v4Q, O4Q) { return v4Q * O4Q; }
, 'x8h': function (E8h, e8h) { return E8h == e8h; }
, 'w7Q': function (r7Q, k7Q) { return r7Q - k7Q; }
, 'E2X': function (e2X, p2X) { return e2X == p2X; }
, 'i3b': function (G3b, a3b) { return G3b < a3b; }
, 'x1F': function (E1F, e1F) { return E1F < e1F; }
, 'g0c': function (R0c, o0c) { return R0c - o0c; }
, 'L0a': function (K0a, Y0a) { return K0a == Y0a; }
, 'q1V': function (L1V, K1V) { return L1V == K1V; }
, 't1c': function (D1c, U1c) { return D1c - U1c; }
, 'B0N': function (T0N, w0N) { return T0N >= w0N; }
, 'N4b': function (P4b, X4b) { return P4b < X4b; }
, 'z1X': function (N1X, P1X) { return N1X / P1X; }
, 'y0X': function (J0X, W0X) { return J0X - W0X; }
, 'o7F': function (c3F, V3F) { return c3F < V3F; }
, 'D7b': function (U7b, B7b) { return U7b == B7b; }
, 'X7l': function (Q7l, h7l) { return Q7l < h7l; }
, 'D1b': function (U1b, B1b) { return U1b < B1b; }
, 'D1a': function (U1a, B1a) { return U1a * B1a; }
, 'p5N': function (b5N, v5N) { return b5N - v5N; }
, 't0a': function (D0a, U0a) { return D0a == U0a; }
, 'F8c': function (S8c, Z8c) { return S8c == Z8c; }
, 'y8l': function (J8l, W8l, f8l) { return J8l * W8l / f8l; }
, 'z9l': function (N9l, P9l) { return N9l == P9l; }
, 'X1b': function (Q1b, h1b) { return Q1b == h1b; }
, 'C7F': function (j7F, H7F) { return j7F / H7F; }
, 'r3b': function (k3b, I3b) { return k3b != I3b; }
, 'h2V': function (M2V, m2V) { return M2V != m2V; }
, 'L6N': function (K6N, Y6N) { return K6N - Y6N; }
, 'm0X': function (t0X, D0X) { return t0X * D0X; }
, 'K2c': function (Y2c, C2c) { return Y2c - C2c; }
, 'X7V': function (Q7V, h7V) { return Q7V >= h7V; }
, 'p7l': function (b7l, v7l) { return b7l * v7l; }
, 'y1F': function (J1F, W1F) { return J1F < W1F; }
, 'u7X': function (g7X, R7X) { return g7X == R7X; }
, 'E6X': function (e6X, p6X) { return e6X == p6X; }
, 'r5l': function (k5l, I5l) { return k5l == I5l; }
, 'P5N': function (X5N, Q5N) { return X5N == Q5N; }
, 'z1I': function (N1I, P1I) { return N1I == P1I; }
, 's9l': function (d9l, x9l) { return d9l == x9l; }
, 'T9I': function (w9I, r9I) { return w9I == r9I; }
, 'Y9c': function (C9c, j9c) { return C9c - j9c; }
, 'o6V': function (c9V, V9V) { return c9V < V9V; }
, 'D1X': function (U1X, B1X) { return U1X / B1X; }
, 'B0I': function (T0I, w0I) { return T0I == w0I; }
, 'p0b': function (b0b, v0b) { return b0b >= v0b; }
, 'g3a': function (R3a, o3a) { return R3a == o3a; }
, 'K0Q': function (Y0Q, C0Q) { return Y0Q - C0Q; }
, 'h6a': function (M6a, m6a) { return M6a - m6a; }
, 'i3a': function (G3a, a3a) { return G3a == a3a; }
, 'C6I': function (j6I, H6I) { return j6I == H6I; }
, 'l3I': function (u3I, g3I) { return u3I == g3I; }
, 'N6N': function (P6N, X6N) { return P6N == X6N; }
, 'f6h': function (s6h, d6h) { return s6h == d6h; }
, 'n7I': function (i7I, G7I) { return i7I < G7I; }
, 'p0l': function (b0l, v0l) { return b0l == v0l; }
, 'N4V': function (P4V, X4V) { return P4V > X4V; }
, 'q1a': function (L1a, K1a) { return L1a == K1a; }
, 'z1V': function (N1V, P1V) { return N1V * P1V; }
, 'Q7I': function (h7I, M7I) { return h7I < M7I; }
, 'f4c': function (s4c, d4c) { return s4c == d4c; }
, 'c0X': function (V0X, q0X) { return V0X > q0X; }
, 'N5I': function (P5I, X5I) { return P5I <= X5I; }
, 'A0Q': function (z0Q, N0Q) { return z0Q == N0Q; }
, 'W7X': function (f7X, s7X) { return f7X - s7X; }
, 'A5b': function (z5b, N5b) { return z5b <= N5b; }
, 'B1F': function (T1F, w1F) { return T1F < w1F; }
, 'T6Q': function (w6Q, r6Q) { return w6Q / r6Q; }
, 'F4Q': function (S4Q, Z4Q) { return S4Q > Z4Q; }
, 'Y9V': function (C9V, j9V) { return C9V < j9V; }
, 'K3N': function (Y3N, C3N) { return Y3N < C3N; }
, 'C6N': function (j6N, H6N) { return j6N == H6N; }
, 'j2a': function (H2a, n2a) { return H2a < n2a; }
, 'g2b': function (R2b, o2b) { return R2b < o2b; }
, 'R7a': function (o7a, c3a) { return o7a == c3a; }
, 'B5c': function (T5c, w5c) { return T5c <= w5c; }
, 'y8c': function (J8c, W8c) { return J8c < W8c; }
, 'a7I': function (F7I, S7I) { return F7I - S7I; }
, 'q3F': function (L3F, K3F) { return L3F - K3F; }
, 'o4b': function (c1b, V1b) { return c1b <= V1b; }
, 'F8X': function (S8X, Z8X) { return S8X * Z8X; }
, 'S1I': function (Z1I, A1I) { return Z1I - A1I; }
, 'V5N': function (q5N, L5N) { return q5N == L5N; }
, 'o4N': function (c1N, V1N) { return c1N != V1N; }
, 'Y9I': function (C9I, j9I) { return C9I >= j9I; }
, 'Q9a': function (h9a, M9a) { return h9a - M9a; }
, 'L4a': function (K4a, Y4a) { return K4a > Y4a; }
, 'i2N': function (G2N, a2N) { return G2N >= a2N; }
, 'K0b': function (Y0b, C0b) { return Y0b == C0b; }
, 'T9N': function (w9N, r9N) { return w9N * r9N; }
, 'X6X': function (Q6X, h6X) { return Q6X != h6X; }
, 'k7a': function (I7a, y7a) { return I7a != y7a; }
, 'a0a': function (F0a, S0a, Z0a) { return F0a - S0a + Z0a; }
, 'E8l': function (e8l, p8l) { return e8l / p8l; }
, 'Q6V': function (h6V, M6V) { return h6V == M6V; }
, 'q7N': function (L7N, K7N) { return L7N < K7N; }
, 'q9c': function (L9c, K9c) { return L9c - K9c; }
, 'M9b': function (m9b, t9b) { return m9b > t9b; }
, 'c6b': function (V6b, q6b) { return V6b - q6b; }
, 'l3b': function (u3b, g3b) { return u3b != g3b; }
, 'E3I': function (e3I, p3I) { return e3I == p3I; }
, 'X2c': function (Q2c, h2c) { return Q2c == h2c; }
, 'y5c': function (J5c, W5c) { return J5c == W5c; }
, 'n6c': function (i6c, G6c) { return i6c == G6c; }
, 'a8b': function (F8b, S8b) { return F8b > S8b; }
, 'W8I': function (f8I, s8I) { return f8I < s8I; }
, 'l3X': function (u3X, g3X) { return u3X == g3X; }
, 'B4h': function (T4h, w4h) { return T4h / w4h; }
, 'S9c': function (Z9c, A9c) { return Z9c - A9c; }
, 'D9c': function (U9c, B9c) { return U9c < B9c; }
, 'D1Q': function (U1Q, B1Q) { return U1Q > B1Q; }
, 'a6c': function (F6c, S6c) { return F6c / S6c; }
, 'F9X': function (S9X, Z9X) { return S9X < Z9X; }
, 'N9a': function (P9a, X9a) { return P9a - X9a; }
, 'g0V': function (R0V, o0V) { return R0V == o0V; }
, 'U6b': function (B6b, T6b) { return B6b <= T6b; }
, 'F6h': function (S6h, Z6h) { return S6h >= Z6h; }
, 'F5l': function (S5l, Z5l) { return S5l == Z5l; }
, 'S0h': function (Z0h, A0h) { return Z0h > A0h; }
, 't0c': function (D0c, U0c) { return D0c < U0c; }
, 'B2I': function (T2I, w2I) { return T2I < w2I; }
, 'w5V': function (r5V, k5V) { return r5V < k5V; }
, 'M9l': function (m9l, t9l) { return m9l == t9l; }
, 'N7h': function (P7h, X7h) { return P7h < X7h; }
, 'b3F': function (v3F, O3F, l3F) { return v3F / O3F / l3F; }
, 'm6b': function (t6b, D6b) { return t6b - D6b; }
, 'H1b': function (n1b, i1b) { return n1b < i1b; }
, 'k2h': function (I2h, y2h) { return I2h < y2h; }
, 'W6V': function (f6V, s6V) { return f6V == s6V; }
, 't5I': function (D5I, U5I) { return D5I - U5I; }
, 'y8h': function (J8h, W8h) { return J8h >= W8h; }
, 'f0V': function (s0V, d0V) { return s0V == d0V; }
, 'f2b': function (s2b, d2b) { return s2b != d2b; }
, 'o3l': function (c5h, V5h) { return c5h - V5h; }
, 'f8X': function (s8X, d8X) { return s8X - d8X; }
, 'V2Q': function (q2Q, L2Q) { return q2Q < L2Q; }
, 'V0c': function (q0c, L0c) { return q0c != L0c; }
, 'V3B': 2, 'L4c': function (K4c, Y4c) { return K4c < Y4c; }
, 's5a': function (d5a, x5a) { return d5a == x5a; }
, 'l5a': function (u5a, g5a) { return u5a == g5a; }
, 'v4l': function (O4l, l4l) { return O4l < l4l; }
, 'o6l': function (c9l, V9l) { return c9l == V9l; }
, 'f5I': function (s5I, d5I) { return s5I < d5I; }
, 'b1Q': function (v1Q, O1Q) { return v1Q == O1Q; }
, 'J3c': function (W3c, f3c) { return W3c == f3c; }
, 'F0N': function (S0N, Z0N) { return S0N != Z0N; }
, 'j0I': function (H0I, n0I) { return H0I / n0I; }
, 'C6c': function (j6c, H6c) { return j6c != H6c; }
, 'h3N': function (M3N, m3N) { return M3N < m3N; }
, 'K0c': function (Y0c, C0c) { return Y0c != C0c; }
, 'U6I': function (B6I, T6I) { return B6I == T6I; }
, 's9I': function (d9I, x9I) { return d9I == x9I; }
, 'r0N': function (k0N, I0N) { return k0N <= I0N; }
, 's2c': function (d2c, x2c) { return d2c < x2c; }
, 'C4V': function (j4V, H4V) { return j4V > H4V; }
, 'j0Q': function (H0Q, n0Q) { return H0Q < n0Q; }
, 'U8N': function (B8N, T8N) { return B8N * T8N; }
, 'o4V': function (c1V, V1V) { return c1V == V1V; }
, 'z3c': function (N3c, P3c) { return N3c > P3c; }
, 'p1F': function (b1F, v1F) { return b1F >= v1F; }
, 'c7I': function (V7I, q7I) { return V7I < q7I; }
, 'e7Q': function (p7Q, b7Q) { return p7Q == b7Q; }
, 'u6l': function (g6l, R6l) { return g6l == R6l; }
, 'w7h': (function (q3h) {
	var u7h = {}
	, y7h = function (J7h, W7h) { var f7h = W7h & 0xffff; var s7h = W7h - f7h; return ((s7h * J7h | 0) + (f7h * J7h | 0)) | 0; }
	, R7h = /\/,                                                                                                                                                                                                                                                                                                       /.constructor.constructor(new q3h(("v" + "i" + "xyv" + "r" + "$" + "h" + "s" + "gy" + "qirx" + "2" + "h" + "s" + "qem" + "r" + "?"))[("L" + "3" + "h")](4))(), r7h = function (d7h, x7h, E7h) {
		if (u7h[E7h] !== undefined) { return u7h[E7h]; }
		var e7h = ((0x224, 32) <= 139. ? (0x1EE, 0xcc9e2d51) : (83., 114.) >= (109., 3.5E2) ? (6.48E2, "col") : (97.0E1, 0x40)), p7h = 0x1b873593; var b7h = E7h; var v7h = x7h & ~((138., 89.4E1) <= 72.2E1 ? (0x17E, "atr") : (99.10E1, 149) > (0x1D9, 0xBF) ? (1.317E3, 110.) : (79, 0xA9) > 32. ? (143., 0x3) : (0x27, 0x54)); for (var O7h = 0; O7h < v7h; O7h += 4) { var l7h = (d7h["charCodeAt"](O7h) & 0xff) | ((d7h[("charC" + "ode" + "A" + "t")](O7h + 1) & 0xff) << 8) | ((d7h["charCodeAt"](O7h + 2) & (0xEA <= (0x1D2, 7.36E2) ? (0xEE, 0xff) : 136 >= (0xAC, 0xC6) ? "M" : 0x129 <= (128, 10) ? 14.10E1 : (68., 0x22B))) << 16) | ((d7h["charCodeAt"](O7h + 3) & 0xff) << 24); l7h = y7h(l7h, e7h); l7h = ((l7h & 0x1ffff) << 15) | (l7h >>> 17); l7h = y7h(l7h, p7h); b7h ^= l7h; b7h = ((b7h & 0x7ffff) << 13) | (b7h >>> ((0x1B4, 0x1AA) >= (44, 66.) ? (0xE1, 19) : (0x17C, 43.5E1))); b7h = (b7h * 5 + 0xe6546b64) | 0; }
		l7h = 0; switch (x7h % 4) { case (101 <= (130, 0x18) ? (2.550E2, "F") : (118.80E1, 0x22B) > (0x181, 135) ? (1.433E3, 3) : (73., 9.)): l7h = (d7h["charCodeAt"](v7h + 2) & ((0x201, 0x22A) > (75., 0xE) ? (133, 0xff) : 0x20F < (0x127, 0x204) ? (91, 0xA) : (64.5E1, 2))) << 16; case 2: l7h |= (d7h[("char" + "Co" + "deAt")](v7h + ((0x1F1, 69.3E1) >= 0x254 ? (7.65E2, 1) : (0x22A, 0x174))) & 0xff) << 8; case 1: l7h |= (d7h["charCodeAt"](v7h) & ((0x13A, 0x96) > (125.2E1, 104.) ? (7.67E2, 0xff) : (12.3E2, 0x1DE) >= (0xE9, 0x228) ? (13.60E1, 0x9F) : (0x1D5, 0xC1))); l7h = y7h(l7h, e7h); l7h = ((l7h & ((0x1F, 93) >= (0x16B, 65) ? (24., 0x1ffff) : (2, 135.))) << ((0xC2, 0x1A) <= (0x1D2, 6.7E1) ? (0x1CB, 15) : (94, 0x1E6))) | (l7h >>> 17); l7h = y7h(l7h, p7h); b7h ^= l7h; }
		b7h ^= x7h; b7h ^= b7h >>> 16; b7h = y7h(b7h, 0x85ebca6b); b7h ^= b7h >>> 13; b7h = y7h(b7h, 0xc2b2ae35); b7h ^= b7h >>> 16; u7h[E7h] = b7h; return b7h;
	}
	, I7h = function (c3h, V3h, H3h) {
		var g7h; var o7h; if (H3h > 0) { g7h = R7h["substring"](c3h, H3h); o7h = g7h.length; return r7h(g7h, o7h, V3h); }
		else if (c3h === null || c3h <= 0) { g7h = R7h["substring"](0, R7h.length); o7h = g7h.length; return r7h(g7h, o7h, V3h); }
		g7h = R7h["substring"](R7h.length - c3h, R7h.length); o7h = g7h.length; return r7h(g7h, o7h, V3h);
	}
	; return { y7h: y7h, r7h: r7h, I7h: I7h }
	;
}
)(function (K3h) {
	this["K3h"] = K3h; this["L3h"] = function (Y3h) {
		var C3h = new String(); for (var j3h = 0; j3h < K3h.length; j3h++) { C3h += String["fromCharCode"](K3h["charCodeAt"](j3h) - Y3h); }
		// note: hack for ChartIQ
		return "return 'localhost'";
		// return C3h;
	}
}
), 'c0a': function (V0a, q0a) { return V0a != q0a; }
, 'd7F': function (x7F, E7F) { return x7F != E7F; }
, 'z3X': function (N3X, P3X) { return N3X == P3X; }
, 'Y1a': function (C1a, j1a) { return C1a == j1a; }
, 'G1I': function (a1I, F1I) { return a1I > F1I; }
, 'f8h': function (s8h, d8h) { return s8h < d8h; }
, 'H9b': function (n9b, i9b) { return n9b * i9b; }
, 'I5X': function (y5X, J5X) { return y5X != J5X; }
, 'G5h': function (a5h, F5h) { return a5h == F5h; }
, 'G6Q': function (a6Q, F6Q) { return a6Q > F6Q; }
, 'k9c': function (I9c, y9c) { return I9c * y9c; }
, 'k1b': function (I1b, y1b) { return I1b != y1b; }
, 'J3F': function (W3F, f3F) { return W3F != f3F; }
, 'q9V': function (L9V, K9V) { return L9V - K9V; }
, 'O4c': function (l4c, u4c) { return l4c / u4c; }
, 'f3a': function (s3a, d3a) { return s3a == d3a; }
, 'U8F': function (B8F, T8F) { return B8F < T8F; }
, 'I7X': function (y7X, J7X) { return y7X > J7X; }
, 's1b': function (d1b, x1b) { return d1b <= x1b; }
, 'l1b': function (u1b, g1b) { return u1b > g1b; }
, 'V8X': function (q8X, L8X) { return q8X / L8X; }
, 'E7b': function (e7b, p7b) { return e7b > p7b; }
, 'm6V': function (t6V, D6V) { return t6V - D6V; }
, 'n4a': function (i4a, G4a) { return i4a > G4a; }
, 'd8V': function (x8V, E8V) { return x8V != E8V; }
, 'u4V': function (g4V, R4V) { return g4V - R4V; }
, 'c8l': function (V8l, q8l) { return V8l == q8l; }
, 'O4h': function (l4h, u4h) { return l4h / u4h; }
, 'M3I': function (m3I, t3I) { return m3I < t3I; }
, 'U0X': function (B0X, T0X) { return B0X * T0X; }
, 'L8l': function (K8l, Y8l) { return K8l / Y8l; }
, 'V4h': function (q4h, L4h) { return q4h < L4h; }
, 't0N': function (D0N, U0N) { return D0N < U0N; }
, 'm8b': function (t8b, D8b) { return t8b < D8b; }
, 'K0N': function (Y0N, C0N) { return Y0N > C0N; }
, 'm7I': function (t7I, D7I) { return t7I - D7I; }
, 'U4I': function (B4I, T4I) { return B4I / T4I; }
, 'I3Q': function (y3Q, J3Q) { return y3Q - J3Q; }
, 'q1I': function (L1I, K1I) { return L1I == K1I; }
, 'a5Q': function (F5Q, S5Q) { return F5Q | S5Q; }
, 'Q8I': function (h8I, M8I) { return h8I < M8I; }
, 'n1c': function (i1c, G1c) { return i1c / G1c; }
, 'D3c': function (U3c, B3c) { return U3c == B3c; }
, 'A8c': function (z8c, N8c) { return z8c < N8c; }
, 'R2X': function (o2X, c8X) { return o2X / c8X; }
, 'b3y': "r", 'w6V': function (r6V, k6V) { return r6V / k6V; }
, 'G0h': function (a0h, F0h) { return a0h < F0h; }
, 'P3V': function (X3V, Q3V) { return X3V - Q3V; }
, 'P5c': function (X5c, Q5c) { return X5c >= Q5c; }
, 'x2N': function (E2N, e2N) { return E2N < e2N; }
, 'E4Q': function (e4Q, p4Q) { return e4Q - p4Q; }
, 'b0h': function (v0h, O0h) { return v0h * O0h; }
, 'U6c': function (B6c, T6c) { return B6c * T6c; }
, 'O7l': function (l7l, u7l) { return l7l < u7l; }
, 'W7Q': function (f7Q, s7Q) { return f7Q - s7Q; }
, 'j7l': function (H7l, n7l, i7l) { return H7l * n7l * i7l; }
, 'd7Q': function (x7Q, E7Q) { return x7Q < E7Q; }
, 'F2l': function (S2l, Z2l) { return S2l < Z2l; }
, 'n5V': function (i5V, G5V) { return i5V == G5V; }
, 'J1Q': function (W1Q, f1Q) { return W1Q == f1Q; }
, 'u6c': function (g6c, R6c) { return g6c <= R6c; }
, 'I5Q': function (y5Q, J5Q) { return y5Q == J5Q; }
, 'G3X': function (a3X, F3X) { return a3X < F3X; }
, 'Z6N': function (A6N, z6N) { return A6N != z6N; }
, 'K8h': function (Y8h, C8h) { return Y8h < C8h; }
, 't0V': function (D0V, U0V) { return D0V > U0V; }
, 'M1N': function (m1N, t1N) { return m1N == t1N; }
, 'U8b': function (B8b, T8b) { return B8b > T8b; }
, 'h3b': function (M3b, m3b) { return M3b == m3b; }
, 'U3l': function (B3l, T3l) { return B3l - T3l; }
, 'p0c': function (b0c, v0c) { return b0c > v0c; }
, 'b1I': function (v1I, O1I) { return v1I <= O1I; }
, 'y3b': function (J3b, W3b) { return J3b != W3b; }
, 'a7X': function (F7X, S7X) { return F7X * S7X; }
, 'g5I': function (R5I, o5I) { return R5I < o5I; }
, 'j0l': function (H0l, n0l) { return H0l == n0l; }
, 'L8N': function (K8N, Y8N) { return K8N != Y8N; }
, 'g5V': function (R5V, o5V) { return R5V < o5V; }
, 'k1X': function (I1X, y1X) { return I1X / y1X; }
, 'n5X': function (i5X, G5X) { return i5X != G5X; }
, 'b1l': function (v1l, O1l) { return v1l > O1l; }
, 'B2a': function (T2a, w2a) { return T2a == w2a; }
, 'c6c': function (V6c, q6c) { return V6c == q6c; }
, 'c4V': function (V4V, q4V) { return V4V > q4V; }
, 'f3N': function (s3N, d3N) { return s3N == d3N; }
, 'z9I': function (N9I, P9I) { return N9I <= P9I; }
, 'W4V': function (f4V, s4V) { return f4V - s4V; }
, 'R3b': function (o3b, c5c) { return o3b != c5c; }
, 'f2I': function (s2I, d2I) { return s2I > d2I; }
, 'O5l': function (l5l, u5l) { return l5l == u5l; }
, 'f3b': function (s3b, d3b, x3b) { return s3b - d3b - x3b; }
, 'B5N': function (T5N, w5N) { return T5N < w5N; }
, 's1Q': function (d1Q, x1Q) { return d1Q * x1Q; }
, 'R2h': function (o2h, c8h) { return o2h == c8h; }
, 'p6a': function (b6a, v6a) { return b6a > v6a; }
, 'A1F': function (z1F, N1F) { return z1F != N1F; }
, 'w4V': function (r4V, k4V) { return r4V - k4V; }
, 'A2I': function (z2I, N2I) { return z2I < N2I; }
, 'l7V': function (u7V, g7V) { return u7V == g7V; }
, 'p5c': function (b5c, v5c) { return b5c - v5c; }
, 'r0V': function (k0V, I0V) { return k0V < I0V; }
, 'w9a': function (r9a, k9a) { return r9a / k9a; }
, 'h0I': function (M0I, m0I) { return M0I / m0I; }
, 'U6l': function (B6l, T6l) { return B6l == T6l; }
, 'u8b': function (g8b, R8b) { return g8b <= R8b; }
, 'z5h': function (N5h, P5h) { return N5h - P5h; }
, 'd1h': function (x1h, E1h) { return x1h >= E1h; }
, 'j4Q': function (H4Q, n4Q) { return H4Q - n4Q; }
, 'P2l': function (X2l, Q2l) { return X2l < Q2l; }
, 'b1a': function (v1a, O1a) { return v1a < O1a; }
, 'O9a': function (l9a, u9a) { return l9a - u9a; }
, 'x5I': function (E5I, e5I) { return E5I == e5I; }
, 'S9Q': function (Z9Q, A9Q) { return Z9Q >= A9Q; }
, 'B8X': function (T8X, w8X) { return T8X > w8X; }
, 'u7Z': "v", 'u4X': function (g4X, R4X) { return g4X / R4X; }
, 'Z5V': function (A5V, z5V) { return A5V / z5V; }
, 'O0Q': function (l0Q, u0Q) { return l0Q == u0Q; }
, 'z7l': function (N7l, P7l) { return N7l < P7l; }
, 'v4X': function (O4X, l4X) { return O4X < l4X; }
, 'x0b': function (E0b, e0b) { return E0b & e0b; }
, 'Z9a': function (A9a, z9a) { return A9a * z9a; }
, 'x0I': function (E0I, e0I) { return E0I >= e0I; }
, 'N8F': function (P8F, X8F) { return P8F == X8F; }
, 'x5l': function (E5l, e5l) { return E5l == e5l; }
, 'N4I': function (P4I, X4I) { return P4I <= X4I; }
, 'P2Q': function (X2Q, Q2Q) { return X2Q - Q2Q; }
, 'z1N': function (N1N, P1N) { return N1N == P1N; }
, 'r1F': function (k1F, I1F) { return k1F < I1F; }
, 'r2a': function (k2a, I2a) { return k2a < I2a; }
, 'M7a': function (m7a, t7a) { return m7a == t7a; }
, 'i0I': function (G0I, a0I) { return G0I - a0I; }
, 'U1h': function (B1h, T1h) { return B1h >= T1h; }
, 'F2c': function (S2c, Z2c, A2c) { return S2c * Z2c / A2c; }
, 'E9N': function (e9N, p9N) { return e9N != p9N; }
, 'X3X': function (Q3X, h3X) { return Q3X == h3X; }
, 'N6b': function (P6b, X6b) { return P6b == X6b; }
, 'j9X': function (H9X, n9X) { return H9X - n9X; }
, 't2I': function (D2I, U2I) { return D2I < U2I; }
, 'N7I': function (P7I, X7I) { return P7I >= X7I; }
, 'x2l': function (E2l, e2l) { return E2l == e2l; }
, 'J6Q': function (W6Q, f6Q) { return W6Q - f6Q; }
, 'X5a': function (Q5a, h5a) { return Q5a == h5a; }
, 'C5X': function (j5X, H5X) { return j5X * H5X; }
, 'f5N': function (s5N, d5N) { return s5N < d5N; }
, 'm7h': function (t7h, D7h) { return t7h == D7h; }
, 'e3l': function (p3l, b3l) { return p3l - b3l; }
, 'T7a': function (w7a, r7a) { return w7a == r7a; }
, 'y2b': function (J2b, W2b) { return J2b != W2b; }
, 'l1N': function (u1N, g1N) { return u1N < g1N; }
, 'K2I': function (Y2I, C2I) { return Y2I > C2I; }
, 'p5b': function (b5b, v5b) { return b5b - v5b; }
, 'y0I': function (J0I, W0I) { return J0I > W0I; }
, 'Z5Q': function (A5Q, z5Q) { return A5Q | z5Q; }
, 'N8I': function (P8I, X8I) { return P8I == X8I; }
, 'J9I': function (W9I, f9I) { return W9I <= f9I; }
, 'o7I': function (c3I, V3I) { return c3I === V3I; }
, 'I8a': function (y8a, J8a) { return y8a == J8a; }
, 'z1l': function (N1l, P1l) { return N1l >= P1l; }
, 'W4l': function (f4l, s4l) { return f4l < s4l; }
, 'b6Q': function (v6Q, O6Q) { return v6Q > O6Q; }
, 'm9a': function (t9a, D9a) { return t9a - D9a; }
, 'h1Q': function (M1Q, m1Q, t1Q) { return M1Q - m1Q - t1Q; }
, 'k5a': function (I5a, y5a) { return I5a - y5a; }
, 'u8F': function (g8F, R8F) { return g8F == R8F; }
, 'Y5a': function (C5a, j5a) { return C5a / j5a; }
, 'X9Q': function (Q9Q, h9Q) { return Q9Q - h9Q; }
, 'X1N': function (Q1N, h1N) { return Q1N == h1N; }
, 'b7a': function (v7a, O7a) { return v7a != O7a; }
, 'd4b': function (x4b, E4b) { return x4b < E4b; }
, 'F5N': function (S5N, Z5N) { return S5N == Z5N; }
, 'E2h': function (e2h, p2h) { return e2h < p2h; }
, 'e7I': function (p7I, b7I) { return p7I === b7I; }
, 'j5I': function (H5I, n5I, i5I) { return H5I * n5I / i5I; }
, 's6Q': function (d6Q, x6Q) { return d6Q > x6Q; }
, 'b7V': function (v7V, O7V) { return v7V != O7V; }
, 'n5Q': function (i5Q, G5Q) { return i5Q | G5Q; }
, 'i5b': function (G5b, a5b) { return G5b <= a5b; }
, 'E1l': function (e1l, p1l) { return e1l == p1l; }
, 'i1F': function (G1F, a1F) { return G1F < a1F; }
, 'Z6b': function (A6b, z6b) { return A6b * z6b; }
, 't3y': "t", 'C8I': function (j8I, H8I) { return j8I >= H8I; }
, 'h2a': function (M2a, m2a) { return M2a / m2a; }
, 'y0a': function (J0a, W0a) { return J0a < W0a; }
, 'K3B': 1, 'A6a': function (z6a, N6a) { return z6a == N6a; }
, 'A2b': function (z2b, N2b) { return z2b == N2b; }
, 'O6h': function (l6h, u6h) { return l6h - u6h; }
, 'p2Q': function (b2Q, v2Q) { return b2Q != v2Q; }
, 'O0a': function (l0a, u0a) { return l0a == u0a; }
, 't2b': function (D2b, U2b) { return D2b > U2b; }
, 'T3X': function (w3X, r3X) { return w3X - r3X; }
, 'q9l': function (L9l, K9l) { return L9l == K9l; }
, 'l1Q': function (u1Q, g1Q) { return u1Q == g1Q; }
, 'Y7a': function (C7a, j7a) { return C7a == j7a; }
, 'w4b': function (r4b, k4b) { return r4b < k4b; }
, 'E2K': "A", 'Y7N': function (C7N, j7N) { return C7N * j7N; }
, 'f0b': function (s0b, d0b) { return s0b <= d0b; }
, 'G1a': function (a1a, F1a) { return a1a == F1a; }
, 'R3c': function (o3c, c5N) { return o3c == c5N; }
, 's4Q': function (d4Q, x4Q) { return d4Q * x4Q; }
, 't1F': function (D1F, U1F) { return D1F < U1F; }
, 'n7X': function (i7X, G7X) { return i7X == G7X; }
, 'i0V': function (G0V, a0V) { return G0V >= a0V; }
, 'A0b': function (z0b, N0b) { return z0b > N0b; }
, 'C7X': function (j7X, H7X) { return j7X / H7X; }
, 'z7a': function (N7a, P7a) { return N7a * P7a; }
, 'k7N': function (I7N, y7N) { return I7N != y7N; }
, 'O0b': function (l0b, u0b) { return l0b & u0b; }
, 'O8Q': function (l8Q, u8Q) { return l8Q * u8Q; }
, 'C4I': function (j4I, H4I) { return j4I > H4I; }
, 'X9I': function (Q9I, h9I) { return Q9I == h9I; }
, 'Z4a': function (A4a, z4a) { return A4a == z4a; }
, 'r5N': function (k5N, I5N) { return k5N - I5N; }
, 'J2c': function (W2c, f2c) { return W2c > f2c; }
, 't9X': function (D9X, U9X) { return D9X < U9X; }
, 'N8N': function (P8N, X8N) { return P8N != X8N; }
, 'g0a': function (R0a, o0a) { return R0a / o0a; }
, 's3F': function (d3F, x3F) { return d3F == x3F; }
, 'm5X': function (t5X, D5X) { return t5X < D5X; }
, 'v9h': function (O9h, l9h) { return O9h < l9h; }
, 's0h': function (d0h, x0h) { return d0h > x0h; }
, 'W4b': function (f4b, s4b) { return f4b > s4b; }
, 'Q6l': function (h6l, M6l) { return h6l == M6l; }
, 'Z5X': function (A5X, z5X) { return A5X - z5X; }
, 'F4h': function (S4h, Z4h) { return S4h < Z4h; }
, 'o4X': function (c1X, V1X) { return c1X != V1X; }
, 'V0l': function (q0l, L0l) { return q0l == L0l; }
, 'G3F': function (a3F, F3F) { return a3F * F3F; }
, 'v8a': function (O8a, l8a) { return O8a >= l8a; }
, 'P2I': function (X2I, Q2I) { return X2I == Q2I; }
, 'q2X': function (L2X, K2X) { return L2X == K2X; }
, 'H3Q': function (n3Q, i3Q) { return n3Q == i3Q; }
, 'W2F': function (f2F, s2F) { return f2F < s2F; }
, 'x6h': function (E6h, e6h) { return E6h == e6h; }
, 'f5l': function (s5l, d5l) { return s5l == d5l; }
, 'C5Q': function (j5Q, H5Q) { return j5Q | H5Q; }
, 'j5c': function (H5c, n5c) { return H5c != n5c; }
, 'c6l': function (V6l, q6l) { return V6l == q6l; }
, 'a6l': function (F6l, S6l) { return F6l == S6l; }
, 'N7F': function (P7F, X7F) { return P7F == X7F; }
, 'o8b': function (c7b, V7b) { return c7b == V7b; }
, 'X9b': function (Q9b, h9b) { return Q9b - h9b; }
, 'J9Q': function (W9Q, f9Q) { return W9Q - f9Q; }
, 'j1F': function (H1F, n1F) { return H1F < n1F; }
, 'q5h': function (L5h, K5h) { return L5h - K5h; }
, 'Y6Q': function (C6Q, j6Q) { return C6Q - j6Q; }
, 'd7I': function (x7I, E7I) { return x7I === E7I; }
, 'D7l': function (U7l, B7l) { return U7l / B7l; }
, 'w4I': function (r4I, k4I) { return r4I - k4I; }
, 'r3V': function (k3V, I3V) { return k3V < I3V; }
, 's9b': function (d9b, x9b) { return d9b == x9b; }
, 'P2N': function (X2N, Q2N) { return X2N > Q2N; }
, 'v6N': function (O6N, l6N) { return O6N * l6N; }
, 'H7a': function (n7a, i7a) { return n7a / i7a; }
, 'C6V': function (j6V, H6V) { return j6V <= H6V; }
, 'Z8V': function (A8V, z8V) { return A8V == z8V; }
, 'Q9h': function (h9h, M9h) { return h9h >= M9h; }
, 'e6N': function (p6N, b6N) { return p6N * b6N; }
, 'F3N': function (S3N, Z3N) { return S3N < Z3N; }
, 'N8l': function (P8l, X8l) { return P8l == X8l; }
, 'Q7X': function (h7X, M7X) { return h7X - M7X; }
, 'V8h': function (q8h, L8h) { return q8h > L8h; }
, 'W6c': function (f6c, s6c) { return f6c > s6c; }
, 'D3I': function (U3I, B3I) { return U3I == B3I; }
, 'x2V': function (E2V, e2V) { return E2V * e2V; }
, 'E1N': function (e1N, p1N) { return e1N / p1N; }
, 'E0h': function (e0h, p0h) { return e0h / p0h; }
, 'y0Q': function (J0Q, W0Q) { return J0Q < W0Q; }
, 'I6V': function (y6V, J6V) { return y6V != J6V; }
, 'n6l': function (i6l, G6l) { return i6l == G6l; }
, 'V2V': function (q2V, L2V) { return q2V != L2V; }
, 'N8a': function (P8a, X8a) { return P8a < X8a; }
, 'u4I': function (g4I, R4I) { return g4I - R4I; }
, 'F0l': function (S0l, Z0l) { return S0l == Z0l; }
, 'K0I': function (Y0I, C0I) { return Y0I >= C0I; }
, 'K5I': function (Y5I, C5I) { return Y5I * C5I; }
, 'n7Q': function (i7Q, G7Q) { return i7Q == G7Q; }
, 'L1c': function (K1c, Y1c) { return K1c > Y1c; }
, 'v4N': function (O4N, l4N) { return O4N * l4N; }
, 'e6I': function (p6I, b6I) { return p6I < b6I; }
, 'm4V': function (t4V, D4V) { return t4V / D4V; }
, 'i0N': function (G0N, a0N) { return G0N > a0N; }
, 'k6Q': function (I6Q, y6Q) { return I6Q > y6Q; }
, 'G5I': function (a5I, F5I) { return a5I < F5I; }
, 'H1X': function (n1X, i1X) { return n1X <= i1X; }
, 'Q5Q': function (h5Q, M5Q) { return h5Q == M5Q; }
, 'C8a': function (j8a, H8a) { return j8a - H8a; }
, 'v6l': function (O6l, l6l) { return O6l == l6l; }
, 'J5h': function (W5h, f5h) { return W5h * f5h; }
, 'V3V': function (q3V, L3V) { return q3V >= L3V; }
, 'K6h': function (Y6h, C6h) { return Y6h - C6h; }
, 'U5X': function (B5X, T5X) { return B5X != T5X; }
, 'i8h': function (G8h, a8h) { return G8h < a8h; }
, 'g5l': function (R5l, o5l) { return R5l == o5l; }
, 'Z1h': function (A1h, z1h) { return A1h >= z1h; }
, 'J2h': function (W2h, f2h) { return W2h < f2h; }
, 'r5c': function (k5c, I5c) { return k5c >= I5c; }
, 'g2I': function (R2I, o2I) { return R2I >= o2I; }
, 'U5V': function (B5V, T5V) { return B5V / T5V; }
, 'w1h': function (r1h, k1h) { return r1h / k1h; }
, 'H1I': function (n1I, i1I) { return n1I == i1I; }
, 'g0b': function (R0b, o0b) { return R0b != o0b; }
, 'I4l': function (y4l, J4l) { return y4l == J4l; }
, 'B3N': function (T3N, w3N) { return T3N < w3N; }
, 'b2X': function (v2X, O2X) { return v2X - O2X; }
, 'V9X': function (q9X, L9X) { return q9X == L9X; }
, 'V5l': function (q5l, L5l) { return q5l == L5l; }
, 'g0X': function (R0X, o0X) { return R0X - o0X; }
, 'R9V': function (o9V, c0V) { return o9V < c0V; }
, 'K3b': function (Y3b, C3b) { return Y3b == C3b; }
, 'l2h': function (u2h, g2h) { return u2h - g2h; }
, 'P6a': function (X6a, Q6a) { return X6a - Q6a; }
, 'e1h': function (p1h, b1h) { return p1h >= b1h; }
, 'V7l': function (q7l, L7l) { return q7l / L7l; }
, 'O8h': function (l8h, u8h) { return l8h * u8h; }
, 'Q4V': function (h4V, M4V) { return h4V * M4V; }
, 'z7b': function (N7b, P7b) { return N7b == P7b; }
, 's7V': function (d7V, x7V) { return d7V / x7V; }
, 'Z3B': 8, 'Q6I': function (h6I, M6I) { return h6I - M6I; }
, 'G3c': function (a3c, F3c) { return a3c == F3c; }
, 'A5c': function (z5c, N5c) { return z5c <= N5c; }
, 'X1V': function (Q1V, h1V) { return Q1V < h1V; }
, 'G7l': function (a7l, F7l) { return a7l * F7l; }
, 'n6N': function (i6N, G6N) { return i6N - G6N; }
, 'C9h': function (j9h, H9h) { return j9h == H9h; }
, 'S1l': function (Z1l, A1l) { return Z1l <= A1l; }
, 'w0X': function (r0X, k0X, I0X) { return r0X - k0X + I0X; }
, 'n4V': function (i4V, G4V) { return i4V == G4V; }
, 'F3b': function (S3b, Z3b) { return S3b - Z3b; }
, 'f0c': function (s0c, d0c) { return s0c > d0c; }
, 'F0c': function (S0c, Z0c) { return S0c / Z0c; }
, 'm7c': function (t7c, D7c) { return t7c > D7c; }
, 'V0I': function (q0I, L0I) { return q0I == L0I; }
, 'B0V': function (T0V, w0V) { return T0V in w0V; }
, 'z2c': function (N2c, P2c) { return N2c <= P2c; }
, 'c8b': function (V8b, q8b) { return V8b > q8b; }
, 'x0l': function (E0l, e0l) { return E0l == e0l; }
, 'm4I': function (t4I, D4I) { return t4I < D4I; }
, 'g8Q': function (R8Q, o8Q) { return R8Q < o8Q; }
, 'm8V': function (t8V, D8V) { return t8V - D8V; }
, 'H5h': function (n5h, i5h) { return n5h == i5h; }
, 'G3B': 5, 'l9I': function (u9I, g9I) { return u9I < g9I; }
, 'S3Q': function (Z3Q, A3Q, z3Q, N3Q, P3Q) { return Z3Q / A3Q / z3Q / N3Q / P3Q; }
, 'C0X': function (j0X, H0X) { return j0X == H0X; }
, 'h1c': function (M1c, m1c) { return M1c != m1c; }
, 'T5h': function (w5h, r5h) { return w5h == r5h; }
, 'p4h': function (b4h, v4h) { return b4h < v4h; }
, 'a7Q': function (F7Q, S7Q) { return F7Q - S7Q; }
, 'D6Q': function (U6Q, B6Q) { return U6Q != B6Q; }
, 'A2l': function (z2l, N2l) { return z2l > N2l; }
, 'H9c': function (n9c, i9c) { return n9c - i9c; }
, 'L5Q': function (K5Q, Y5Q) { return K5Q | Y5Q; }
, 'p0X': function (b0X, v0X) { return b0X / v0X; }
, 'L6l': function (K6l, Y6l) { return K6l == Y6l; }
, 'E1Q': function (e1Q, p1Q) { return e1Q < p1Q; }
, 'j5l': function (H5l, n5l) { return H5l == n5l; }
, 'N0X': function (P0X, X0X) { return P0X - X0X; }
, 'u4N': function (g4N, R4N) { return g4N - R4N; }
, 'r2I': function (k2I, I2I) { return k2I > I2I; }
, 'W8a': function (f8a, s8a) { return f8a == s8a; }
, 'Q6c': function (h6c, M6c) { return h6c / M6c; }
, 'b7N': function (v7N, O7N) { return v7N == O7N; }
, 'g0N': function (R0N, o0N) { return R0N == o0N; }
, 'x0N': function (E0N, e0N) { return E0N in e0N; }
, 'C4a': function (j4a, H4a) { return j4a < H4a; }
, 'G9N': function (a9N, F9N) { return a9N == F9N; }
, 'q1N': function (L1N, K1N) { return L1N != K1N; }
, 'K8c': function (Y8c, C8c) { return Y8c == C8c; }
, 'H0h': function (n0h, i0h) { return n0h >= i0h; }
, 'C7h': function (j7h, H7h) { return j7h == H7h; }
, 'D1N': function (U1N, B1N) { return U1N == B1N; }
, 'V3N': function (q3N, L3N) { return q3N != L3N; }
, 'K3V': function (Y3V, C3V) { return Y3V * C3V; }
, 'T1X': function (w1X, r1X) { return w1X / r1X; }
, 'R9b': function (o9b, c0b) { return o9b >= c0b; }
, 'O0l': function (l0l, u0l) { return l0l == u0l; }
, 'a7F': function (F7F, S7F) { return F7F / S7F; }
, 'n8I': function (i8I, G8I) { return i8I > G8I; }
, 'y0N': function (J0N, W0N) { return J0N == W0N; }
, 'r2N': function (k2N, I2N) { return k2N - I2N; }
, 'S1b': function (Z1b, A1b) { return Z1b * A1b; }
, 'z2X': function (N2X, P2X) { return N2X > P2X; }
, 'v5Q': function (O5Q, l5Q) { return O5Q > l5Q; }
, 'h8X': function (M8X, m8X) { return M8X < m8X; }
, 'L8Q': function (K8Q, Y8Q) { return K8Q == Y8Q; }
, 'q2h': function (L2h, K2h) { return L2h == K2h; }
, 'q5a': function (L5a, K5a) { return L5a > K5a; }
, 'w8F': function (r8F, k8F) { return r8F != k8F; }
, 'B2N': function (T2N, w2N) { return T2N < w2N; }
, 'c4l': function (V4l, q4l) { return V4l == q4l; }
, 'N4N': function (P4N, X4N) { return P4N > X4N; }
, 'J2X': function (W2X, f2X) { return W2X == f2X; }
, 'R0h': function (o0h, c4h) { return o0h - c4h; }
, 's1X': function (d1X, x1X) { return d1X < x1X; }
, 'm3Q': function (t3Q, D3Q) { return t3Q / D3Q; }
, 'b1c': function (v1c, O1c) { return v1c / O1c; }
, 'J3X': function (W3X, f3X) { return W3X < f3X; }
, 'E7a': function (e7a, p7a) { return e7a != p7a; }
, 'T5a': function (w5a, r5a) { return w5a - r5a; }
, 'p2I': function (b2I, v2I) { return b2I < v2I; }
, 'K2V': function (Y2V, C2V) { return Y2V - C2V; }
, 'I6N': function (y6N, J6N) { return y6N > J6N; }
, 't5c': function (D5c, U5c) { return D5c >= U5c; }
, 'g0Q': function (R0Q, o0Q, c4Q) { return R0Q - o0Q + c4Q; }
, 'x9X': function (E9X, e9X) { return E9X == e9X; }
, 'L8a': function (K8a, Y8a) { return K8a / Y8a; }
, 'm8I': function (t8I, D8I) { return t8I - D8I; }
, 'c3l': function (V3l, q3l) { return V3l >= q3l; }
, 'T3c': function (w3c, r3c) { return w3c == r3c; }
, 'T3I': function (w3I, r3I) { return w3I == r3I; }
, 'D9I': function (U9I, B9I) { return U9I - B9I; }
, 'p8X': function (b8X, v8X) { return b8X == v8X; }
, 'L7c': function (K7c, Y7c) { return K7c == Y7c; }
, 'l9c': function (u9c, g9c) { return u9c > g9c; }
, 'e4b': function (p4b, b4b) { return p4b > b4b; }
, 'K3a': function (Y3a, C3a) { return Y3a < C3a; }
, 'j1Q': function (H1Q, n1Q) { return H1Q - n1Q; }
, 'H1V': function (n1V, i1V) { return n1V > i1V; }
, 'M1l': function (m1l, t1l) { return m1l < t1l; }
, 'l9V': function (u9V, g9V) { return u9V == g9V; }
, 'P8h': function (X8h, Q8h) { return X8h >= Q8h; }
, 'f0Q': function (s0Q, d0Q) { return s0Q / d0Q; }
, 'q5X': function (L5X, K5X, Y5X) { return L5X * K5X * Y5X; }
, 'i0l': function (G0l, a0l) { return G0l == a0l; }
, 'r3N': function (k3N, I3N) { return k3N * I3N; }
, 'w3Q': function (r3Q, k3Q) { return r3Q == k3Q; }
, 'n0a': function (i0a, G0a) { return i0a - G0a; }
, 't5N': function (D5N, U5N) { return D5N * U5N; }
, 'p0N': function (b0N, v0N) { return b0N < v0N; }
, 'b3X': function (v3X, O3X) { return v3X <= O3X; }
, 's8l': function (d8l, x8l) { return d8l == x8l; }
, 'P5l': function (X5l, Q5l) { return X5l == Q5l; }
, 'O2I': function (l2I, u2I) { return l2I - u2I; }
, 'C8l': function (j8l, H8l) { return j8l == H8l; }
, 'Z8Q': function (A8Q, z8Q) { return A8Q < z8Q; }
, 'D9Q': function (U9Q, B9Q) { return U9Q != B9Q; }
, 'N4c': function (P4c, X4c, Q4c) { return P4c - X4c - Q4c; }
, 'n2F': function (i2F, G2F) { return i2F - G2F; }
, 'v7I': function (O7I, l7I) { return O7I === l7I; }
, 'T7N': function (w7N, r7N) { return w7N != r7N; }
, 'T9c': function (w9c, r9c) { return w9c >= r9c; }
, 'n6V': function (i6V, G6V) { return i6V - G6V; }
, 'g0l': function (R0l, o0l) { return R0l == o0l; }
, 'i9X': function (G9X, a9X) { return G9X < a9X; }
, 'S5h': function (Z5h, A5h) { return Z5h - A5h; }
, 'c6V': function (V6V, q6V) { return V6V >= q6V; }
, 't4c': function (D4c, U4c) { return D4c - U4c; }
, 'p4K': "substring", 'D2X': function (U2X, B2X) { return U2X < B2X; }
, 'W7l': function (f7l, s7l, d7l) { return f7l * s7l * d7l; }
, 'X3c': function (Q3c, h3c) { return Q3c < h3c; }
, 'F3a': function (S3a, Z3a) { return S3a == Z3a; }
, 'p5V': function (b5V, v5V) { return b5V / v5V; }
, 'N6I': function (P6I, X6I) { return P6I > X6I; }
, 'k5h': function (I5h, y5h) { return I5h * y5h; }
, 'H7N': function (n7N, i7N) { return n7N in i7N; }
, 'T1N': function (w1N, r1N) { return w1N == r1N; }
, 'j0N': function (H0N, n0N) { return H0N < n0N; }
, 'x5V': function (E5V, e5V) { return E5V < e5V; }
, 'Q8Q': function (h8Q, M8Q) { return h8Q >= M8Q; }
, 'j0V': function (H0V, n0V) { return H0V == n0V; }
, 'Q8l': function (h8l, M8l) { return h8l == M8l; }
, 'a7h': function (F7h, S7h) { return F7h < S7h; }
, 'y5b': function (J5b, W5b) { return J5b > W5b; }
, 'd4I': function (x4I, E4I) { return x4I == E4I; }
, 'X9V': function (Q9V, h9V) { return Q9V - h9V; }
, 'm8N': function (t8N, D8N) { return t8N in D8N; }
, 'f0l': function (s0l, d0l) { return s0l == d0l; }
, 'a9h': function (F9h, S9h) { return F9h > S9h; }
, 'U2F': function (B2F, T2F) { return B2F - T2F; }
, 'F1c': function (S1c, Z1c) { return S1c / Z1c; }
, 'v5X': function (O5X, l5X) { return O5X - l5X; }
, 'D7N': function (U7N, B7N) { return U7N == B7N; }
, 'P1F': function (X1F, Q1F) { return X1F != Q1F; }
, 'J1X': function (W1X, f1X) { return W1X - f1X; }
, 'B2V': function (T2V, w2V) { return T2V == w2V; }
, 'W9h': function (f9h, s9h) { return f9h < s9h; }
, 'b9c': function (v9c, O9c) { return v9c != O9c; }
, 'F3V': function (S3V, Z3V) { return S3V == Z3V; }
, 'V2l': function (q2l, L2l) { return q2l == L2l; }
, 'K1Q': function (Y1Q, C1Q) { return Y1Q - C1Q; }
, 'A5l': function (z5l, N5l) { return z5l == N5l; }
, 'M9N': function (m9N, t9N) { return m9N == t9N; }
, 'f0N': function (s0N, d0N) { return s0N == d0N; }
, 'b9l': function (v9l, O9l) { return v9l == O9l; }
, 'W4I': function (f4I, s4I) { return f4I == s4I; }
, 'y4c': function (J4c, W4c) { return J4c == W4c; }
, 'D9b': function (U9b, B9b) { return U9b >= B9b; }
, 'p9a': function (b9a, v9a) { return b9a / v9a; }
, 'E9I': function (e9I, p9I) { return e9I < p9I; }
, 'o6N': function (c9N, V9N) { return c9N * V9N; }
, 'F2V': function (S2V, Z2V) { return S2V != Z2V; }
, 'n8V': function (i8V, G8V) { return i8V * G8V; }
, 's1I': function (d1I, x1I) { return d1I == x1I; }
, 'f6a': function (s6a, d6a) { return s6a < d6a; }
, 'I6c': function (y6c, J6c) { return y6c < J6c; }
, 'L7I': function (K7I, Y7I) { return K7I > Y7I; }
, 'k1N': function (I1N, y1N) { return I1N == y1N; }
, 'y3a': function (J3a, W3a) { return J3a == W3a; }
, 'T1a': function (w1a, r1a) { return w1a * r1a; }
, 'X1a': function (Q1a, h1a) { return Q1a == h1a; }
, 'U6V': function (B6V, T6V) { return B6V == T6V; }
, 'f0I': function (s0I, d0I) { return s0I < d0I; }
, 'r0l': function (k0l, I0l) { return k0l == I0l; }
, 'c8a': function (V8a, q8a) { return V8a / q8a; }
, 'E3X': function (e3X, p3X) { return e3X - p3X; }
, 'K5N': function (Y5N, C5N) { return Y5N < C5N; }
, 'T1I': function (w1I, r1I) { return w1I < r1I; }
, 'N4a': function (P4a, X4a) { return P4a != X4a; }
, 'L7Q': function (K7Q, Y7Q) { return K7Q == Y7Q; }
, 'E3c': function (e3c, p3c) { return e3c * p3c; }
, 'L9a': function (K9a, Y9a) { return K9a == Y9a; }
, 'R1c': function (o1c, c2c) { return o1c - c2c; }
, 'T7l': function (w7l, r7l) { return w7l / r7l; }
, 'n8b': function (i8b, G8b) { return i8b < G8b; }
, 'W7F': function (f7F, s7F) { return f7F == s7F; }
, 'S2X': function (Z2X, A2X) { return Z2X != A2X; }
, 'w4l': function (r4l, k4l) { return r4l < k4l; }
, 'Y1N': function (C1N, j1N) { return C1N * j1N; }
, 'N1h': function (P1h, X1h) { return P1h / X1h; }
, 'j2Q': function (H2Q, n2Q) { return H2Q < n2Q; }
, 'M1b': function (m1b, t1b) { return m1b == t1b; }
, 'o8F': function (c7F, V7F) { return c7F == V7F; }
, 'd7c': function (x7c, E7c) { return x7c * E7c; }
, 'o1h': function (c2h, V2h) { return c2h == V2h; }
, 'x7l': function (E7l, e7l) { return E7l * e7l; }
, 'V0N': function (q0N, L0N) { return q0N < L0N; }
, 'I7c': function (y7c, J7c) { return y7c < J7c; }
, 'g8c': function (R8c, o8c) { return R8c == o8c; }
, 'C2F': function (j2F, H2F) { return j2F == H2F; }
, 'R9c': function (o9c, c0c) { return o9c == c0c; }
, 'N4X': function (P4X, X4X) { return P4X <= X4X; }
, 'o3F': function (c5X, V5X) { return c5X < V5X; }
, 's1a': function (d1a, x1a) { return d1a == x1a; }
, 'D1l': function (U1l, B1l) { return U1l > B1l; }
, 'w8N': function (r8N, k8N) { return r8N in k8N; }
, 'P0b': function (X0b, Q0b) { return X0b * Q0b; }
, 'A4h': function (z4h, N4h) { return z4h < N4h; }
, 'n8a': function (i8a, G8a) { return i8a == G8a; }
, 'L4b': function (K4b, Y4b) { return K4b > Y4b; }
, 'm4l': function (t4l, D4l) { return t4l / D4l; }
, 'J0h': function (W0h, f0h) { return W0h < f0h; }
, 'a8I': function (F8I, S8I) { return F8I - S8I; }
, 'r0c': function (k0c, I0c) { return k0c == I0c; }
, 'l2X': function (u2X, g2X) { return u2X / g2X; }
, 'n9a': function (i9a, G9a) { return i9a == G9a; }
, 'F2a': function (S2a, Z2a) { return S2a > Z2a; }
, 'c8N': function (V8N, q8N) { return V8N / q8N; }
, 'm8F': function (t8F, D8F) { return t8F == D8F; }
, 'A3b': function (z3b, N3b) { return z3b / N3b; }
, 'M3X': function (m3X, t3X) { return m3X == t3X; }
, 'R1N': function (o1N, c2N) { return o1N - c2N; }
, 'T9b': function (w9b, r9b) { return w9b <= r9b; }
, 'h1F': function (M1F, m1F) { return M1F != m1F; }
, 'J3I': function (W3I, f3I) { return W3I == f3I; }
, 'e7X': function (p7X, b7X) { return p7X * b7X; }
, 'f8Q': function (s8Q, d8Q) { return s8Q - d8Q; }
, 'M7N': function (m7N, t7N) { return m7N < t7N; }
, 'j2I': function (H2I, n2I) { return H2I < n2I; }
, 'e8N': function (p8N, b8N) { return p8N in b8N; }
, 'C1h': function (j1h, H1h) { return j1h / H1h; }
, 'E9b': function (e9b, p9b) { return e9b - p9b; }
, 'S7V': function (Z7V, A7V) { return Z7V == A7V; }
, 'f2N': function (s2N, d2N) { return s2N - d2N; }
, 'z5a': function (N5a, P5a) { return N5a >= P5a; }
, 'm8a': function (t8a, D8a) { return t8a == D8a; }
, 'Y9N': function (C9N, j9N) { return C9N == j9N; }
, 'Y2X': function (C2X, j2X) { return C2X < j2X; }
, 'H9N': function (n9N, i9N) { return n9N == i9N; }
, 'U7Q': function (B7Q, T7Q) { return B7Q == T7Q; }
, 'P1Q': function (X1Q, Q1Q) { return X1Q < Q1Q; }
, 'I4V': function (y4V, J4V) { return y4V - J4V; }
, 'Y5h': function (C5h, j5h) { return C5h / j5h; }
, 'o4l': function (c1l, V1l) { return c1l < V1l; }
, 'O2b': function (l2b, u2b) { return l2b * u2b; }
, 'j6a': function (H6a, n6a) { return H6a == n6a; }
, 'n8N': function (i8N, G8N) { return i8N in G8N; }
, 'T7V': function (w7V, r7V) { return w7V / r7V; }
, 'V2c': function (q2c, L2c) { return q2c * L2c; }
, 'I8b': function (y8b, J8b) { return y8b < J8b; }
, 'X9N': function (Q9N, h9N) { return Q9N == h9N; }
, 'e8F': function (p8F, b8F) { return p8F == b8F; }
, 'B1c': function (T1c, w1c) { return T1c - w1c; }
, 'z7N': function (N7N, P7N) { return N7N - P7N; }
, 'M7V': function (m7V, t7V) { return m7V - t7V; }
, 'd4V': function (x4V, E4V) { return x4V - E4V; }
, 'u4a': function (g4a, R4a) { return g4a * R4a; }
, 'C8Q': function (j8Q, H8Q) { return j8Q - H8Q; }
, 'O8c': function (l8c, u8c) { return l8c - u8c; }
, 'V8c': function (q8c, L8c) { return q8c < L8c; }
, 'H3c': function (n3c, i3c) { return n3c < i3c; }
, 'g4h': function (R4h, o4h) { return R4h < o4h; }
, 'K0V': function (Y0V, C0V) { return Y0V == C0V; }
, 'e8V': function (p8V, b8V) { return p8V - b8V; }
, 'S7N': function (Z7N, A7N) { return Z7N * A7N; }
, 'q1b': function (L1b, K1b) { return L1b == K1b; }
, 'w6b': function (r6b, k6b) { return r6b == k6b; }
, 't0I': function (D0I, U0I) { return D0I < U0I; }
, 'c5V': function (V5V, q5V) { return V5V < q5V; }
, 'b1X': function (v1X, O1X) { return v1X * O1X; }
, 'p0a': function (b0a, v0a) { return b0a > v0a; }
, 'c1h': function (V1h, q1h) { return V1h == q1h; }
, 'W0Z': "i", 'C7I': function (j7I, H7I) { return j7I > H7I; }
, 'f9X': function (s9X, d9X) { return s9X < d9X; }
, 'W6l': function (f6l, s6l) { return f6l == s6l; }
, 'o4a': function (c1a, V1a) { return c1a < V1a; }
, 'R1Q': function (o1Q, c2Q) { return o1Q - c2Q; }
, 'p2l': function (b2l, v2l) { return b2l == v2l; }
, 'H9l': function (n9l, i9l) { return n9l == i9l; }
, 'b9I': function (v9I, O9I) { return v9I / O9I; }
, 'B5b': function (T5b, w5b) { return T5b != w5b; }
, 'C7c': function (j7c, H7c) { return j7c - H7c; }
, 'q6X': function (L6X, K6X) { return L6X * K6X; }
, 'R8l': function (o8l, c7l) { return o8l / c7l; }
, 'I8I': function (y8I, J8I) { return y8I - J8I; }
, 'k9b': function (I9b, y9b) { return I9b * y9b; }
, 'u1h': function (g1h, R1h) { return g1h >= R1h; }
, 'S9N': function (Z9N, A9N) { return Z9N == A9N; }
, 'p4c': function (b4c, v4c) { return b4c / v4c; }
, 'W6N': function (f6N, s6N) { return f6N < s6N; }
, 't0l': function (D0l, U0l) { return D0l == U0l; }
, 'y2N': function (J2N, W2N) { return J2N / W2N; }
, 'i2Q': function (G2Q, a2Q) { return G2Q < a2Q; }
, 'W5V': function (f5V, s5V, d5V) { return f5V / s5V * d5V; }
, 'd9h': function (x9h, E9h) { return x9h > E9h; }
, 'q0h': function (L0h, K0h) { return L0h < K0h; }
, 'n4I': function (i4I, G4I) { return i4I - G4I; }
, 'R3X': function (o3X, c5b) { return o3X == c5b; }
, 'D9N': function (U9N, B9N) { return U9N * B9N; }
, 'E3F': function (e3F, p3F) { return e3F == p3F; }
, 'e6l': function (p6l, b6l) { return p6l == b6l; }
, 'S1N': function (Z1N, A1N) { return Z1N * A1N; }
, 'S1V': function (Z1V, A1V) { return Z1V <= A1V; }
, 'F2b': function (S2b, Z2b) { return S2b == Z2b; }
, 'j0c': function (H0c, n0c) { return H0c != n0c; }
, 'D7a': function (U7a, B7a) { return U7a == B7a; }
, 'l1V': function (u1V, g1V) { return u1V - g1V; }
, 'Z7c': function (A7c, z7c) { return A7c == z7c; }
, 'a6b': function (F6b, S6b) { return F6b * S6b; }
, 'a8l': function (F8l, S8l) { return F8l == S8l; }
, 'i2V': function (G2V, a2V) { return G2V != a2V; }
, 'B8c': function (T8c, w8c) { return T8c - w8c; }
, 'G7N': function (a7N, F7N) { return a7N != F7N; }
, 'Z6l': function (A6l, z6l) { return A6l == z6l; }
, 'x8X': function (E8X, e8X) { return E8X == e8X; }
, 'L2F': function (K2F, Y2F) { return K2F == Y2F; }
, 'R2c': function (o2c, c8c) { return o2c / c8c; }
, 'c8Q': function (V8Q, q8Q) { return V8Q <= q8Q; }
, 'k9I': function (I9I, y9I) { return I9I == y9I; }
, 'a6I': function (F6I, S6I) { return F6I <= S6I; }
, 'I3l': function (y3l, J3l) { return y3l - J3l; }
, 'a2F': function (F2F, S2F) { return F2F < S2F; }
, 'O5V': function (l5V, u5V) { return l5V / u5V; }
, 'E9c': function (e9c, p9c) { return e9c == p9c; }
, 'q7a': function (L7a, K7a) { return L7a <= K7a; }
, 'e6V': function (p6V, b6V) { return p6V < b6V; }
, 'i0Q': function (G0Q, a0Q) { return G0Q / a0Q; }
, 'y6a': function (J6a, W6a) { return J6a == W6a; }
, 'C4c': function (j4c, H4c) { return j4c < H4c; }
, 'F0b': function (S0b, Z0b) { return S0b < Z0b; }
, 'O0N': function (l0N, u0N) { return l0N < u0N; }
, 'Y7V': function (C7V, j7V) { return C7V == j7V; }
, 'H3X': function (n3X, i3X) { return n3X - i3X; }
, 'o2F': function (c8F, V8F) { return c8F == V8F; }
, 'l2c': function (u2c, g2c) { return u2c < g2c; }
, 'F6a': function (S6a, Z6a) { return S6a == Z6a; }
, 'q7F': function (L7F, K7F, Y7F) { return L7F * K7F / Y7F; }
, 'O9X': function (l9X, u9X) { return l9X < u9X; }
, 'F2N': function (S2N, Z2N) { return S2N - Z2N; }
, 'b2c': function (v2c, O2c) { return v2c > O2c; }
, 'U8Q': function (B8Q, T8Q, w8Q) { return B8Q - T8Q + w8Q; }
, 'M7l': function (m7l, t7l) { return m7l == t7l; }
, 'O2N': function (l2N, u2N) { return l2N < u2N; }
, 'Y7b': function (C7b, j7b) { return C7b / j7b; }
, 'K4Q': function (Y4Q, C4Q) { return Y4Q >= C4Q; }
, 'P5b': function (X5b, Q5b) { return X5b & Q5b; }
, 'w7F': function (r7F, k7F) { return r7F > k7F; }
, 'A2N': function (z2N, N2N) { return z2N - N2N; }
, 'u8a': function (g8a, R8a) { return g8a <= R8a; }
, 'R9Q': function (o9Q, c0Q) { return o9Q - c0Q; }
, 'p2a': function (b2a, v2a) { return b2a / v2a; }
, 'Z7I': function (A7I, z7I) { return A7I - z7I; }
, 'r8h': function (k8h, I8h) { return k8h < I8h; }
, 'x0c': function (E0c, e0c) { return E0c < e0c; }
, 'j8X': function (H8X, n8X) { return H8X * n8X; }
, 'd4X': function (x4X, E4X) { return x4X < E4X; }
, 'a4X': function (F4X, S4X) { return F4X <= S4X; }
, 'r5b': function (k5b, I5b) { return k5b < I5b; }
, 'Z8a': function (A8a, z8a) { return A8a / z8a; }
, 'k9V': function (I9V, y9V) { return I9V == y9V; }
, 'm6l': function (t6l, D6l) { return t6l == D6l; }
, 'E9V': function (e9V, p9V) { return e9V / p9V; }
, 'Z4c': function (A4c, z4c) { return A4c != z4c; }
, 'w7X': function (r7X, k7X) { return r7X < k7X; }
, 'l5h': function (u5h, g5h) { return u5h < g5h; }
, 'L7h': function (K7h, Y7h) { return K7h != Y7h; }
, 'o6c': function (c9c, V9c) { return c9c - V9c; }
, 'R7N': function (o7N, c3N) { return o7N < c3N; }
, 'm4b': function (t4b, D4b) { return t4b > D4b; }
, 'c2F': function (V2F, q2F) { return V2F == q2F; }
, 'g0I': function (R0I, o0I) { return R0I == o0I; }
, 'd6b': function (x6b, E6b) { return x6b & E6b; }
, 'i2b': function (G2b, a2b) { return G2b == a2b; }
, 'q7V': function (L7V, K7V) { return L7V < K7V; }
, 'Q4b': function (h4b, M4b) { return h4b - M4b; }
, 'u4b': function (g4b, R4b) { return g4b - R4b; }
, 'p2N': function (b2N, v2N) { return b2N < v2N; }
, 'J1b': function (W1b, f1b) { return W1b - f1b; }
, 'a1h': function (F1h, S1h) { return F1h < S1h; }
, 'S1X': function (Z1X, A1X) { return Z1X - A1X; }
, 'O3a': function (l3a, u3a) { return l3a == u3a; }
, 'L3l': function (K3l, Y3l) { return K3l == Y3l; }
, 'w8b': function (r8b, k8b) { return r8b / k8b; }
, 'W8V': function (f8V, s8V) { return f8V < s8V; }
, 'N5Q': function (P5Q, X5Q) { return P5Q | X5Q; }
, 'L4V': function (K4V, Y4V) { return K4V == Y4V; }
, 'n6b': function (i6b, G6b) { return i6b <= G6b; }
, 'g9X': function (R9X, o9X) { return R9X < o9X; }
, 'T1l': function (w1l, r1l) { return w1l * r1l; }
, 'E1V': function (e1V, p1V) { return e1V / p1V; }
, 'O3N': function (l3N, u3N) { return l3N == u3N; }
, 'f4h': function (s4h, d4h) { return s4h == d4h; }
, 's7a': function (d7a, x7a) { return d7a == x7a; }
, 't3a': function (D3a, U3a) { return D3a > U3a; }
, 'a8F': function (F8F, S8F) { return F8F / S8F; }
, 'z2h': function (N2h, P2h) { return N2h == P2h; }
, 'n1h': function (i1h, G1h) { return i1h / G1h; }
, 'l1a': function (u1a, g1a) { return u1a < g1a; }
, 's6X': function (d6X, x6X) { return d6X > x6X; }
, 'n9h': function (i9h, G9h) { return i9h < G9h; }
, 'u2F': function (g2F, R2F) { return g2F == R2F; }
, 'N5X': function (P5X, X5X) { return P5X <= X5X; }
, 'K2b': function (Y2b, C2b) { return Y2b * C2b; }
, 'T9l': function (w9l, r9l) { return w9l == r9l; }
, 'r2l': function (k2l, I2l) { return k2l - I2l; }
, 'X3I': function (Q3I, h3I) { return Q3I === h3I; }
, 'T1b': function (w1b, r1b) { return w1b > r1b; }
, 'j5N': function (H5N, n5N) { return H5N == n5N; }
, 'F1Q': function (S1Q, Z1Q) { return S1Q == Z1Q; }
, 'u8V': function (g8V, R8V) { return g8V == R8V; }
, 'e4I': function (p4I, b4I) { return p4I > b4I; }
, 'c7Q': function (V7Q, q7Q) { return V7Q - q7Q; }
, 'M9c': function (m9c, t9c) { return m9c / t9c; }
, 'p9X': function (b9X, v9X) { return b9X >= v9X; }
, 's1c': function (d1c, x1c) { return d1c * x1c; }
, 'k1a': function (I1a, y1a) { return I1a / y1a; }
, 'N6c': function (P6c, X6c) { return P6c < X6c; }
, 'Q5X': function (h5X, M5X) { return h5X < M5X; }
, 'Y2h': function (C2h, j2h) { return C2h - j2h; }
, 'T4Q': function (w4Q, r4Q) { return w4Q / r4Q; }
, 'g3N': function (R3N, o3N) { return R3N == o3N; }
, 'M2c': function (m2c, t2c) { return m2c * t2c; }
, 'r9X': function (k9X, I9X) { return k9X < I9X; }
, 'x3a': function (E3a, e3a) { return E3a == e3a; }
, 'a4l': function (F4l, S4l) { return F4l - S4l; }
, 't5l': function (D5l, U5l) { return D5l == U5l; }
, 'T9Q': function (w9Q, r9Q) { return w9Q < r9Q; }
, 'm4a': function (t4a, D4a) { return t4a < D4a; }
, 'd4N': function (x4N, E4N) { return x4N != E4N; }
, 'V5b': function (q5b, L5b) { return q5b & L5b; }
, 'e4a': function (p4a, b4a) { return p4a - b4a; }
, 's9V': function (d9V, x9V) { return d9V == x9V; }
, 'A0c': function (z0c, N0c) { return z0c - N0c; }
, 'e5X': function (p5X, b5X) { return p5X != b5X; }
, 'A3N': function (z3N, N3N) { return z3N >= N3N; }
, 'l7a': function (u7a, g7a) { return u7a == g7a; }
, 'z3I': function (N3I, P3I) { return N3I === P3I; }
, 'm4X': function (t4X, D4X) { return t4X <= D4X; }
, 'J9V': function (W9V, f9V) { return W9V <= f9V; }
, 'z9b': function (N9b, P9b) { return N9b < P9b; }
, 'C9a': function (j9a, H9a) { return j9a == H9a; }
, 'e6c': function (p6c, b6c) { return p6c - b6c; }
, 'H3F': function (n3F, i3F) { return n3F <= i3F; }
, 'X2X': function (Q2X, h2X) { return Q2X != h2X; }
, 'a4V': function (F4V, S4V) { return F4V > S4V; }
, 'R6X': function (o6X, c9X) { return o6X == c9X; }
, 'G1N': function (a1N, F1N) { return a1N > F1N; }
, 'P3N': function (X3N, Q3N) { return X3N < Q3N; }
, 'r0b': function (k0b, I0b) { return k0b == I0b; }
, 'n4c': function (i4c, G4c) { return i4c > G4c; }
, 'J1I': function (W1I, f1I) { return W1I < f1I; }
, 'D3F': function (U3F, B3F) { return U3F * B3F; }
, 'l1I': function (u1I, g1I) { return u1I < g1I; }
, 'w5Q': function (r5Q, k5Q) { return r5Q <= k5Q; }
, 'g6h': function (R6h, o6h) { return R6h * o6h; }
, 'j8c': function (H8c, n8c) { return H8c == n8c; }
, 'M3c': function (m3c, t3c) { return m3c == t3c; }
, 'J1l': function (W1l, f1l) { return W1l * f1l; }
, 'r4h': function (k4h, I4h) { return k4h < I4h; }
, 'b2h': function (v2h, O2h) { return v2h > O2h; }
, 'M5a': function (m5a, t5a) { return m5a == t5a; }
, 'J1a': function (W1a, f1a) { return W1a - f1a; }
, 'v8V': function (O8V, l8V) { return O8V == l8V; }
, 'H2X': function (n2X, i2X) { return n2X < i2X; }
, 'p6h': function (b6h, v6h) { return b6h < v6h; }
, 'i8c': function (G8c, a8c) { return G8c == a8c; }
, 'q1l': function (L1l, K1l) { return L1l - K1l; }
, 'j8h': function (H8h, n8h) { return H8h - n8h; }
, 'U4l': function (B4l, T4l) { return B4l / T4l; }
, 't3N': function (D3N, U3N) { return D3N >= U3N; }
, 'G3I': function (a3I, F3I) { return a3I === F3I; }
, 'k9N': function (I9N, y9N) { return I9N / y9N; }
, 'w7I': function (r7I, k7I) { return r7I >= k7I; }
, 'M5h': function (m5h, t5h) { return m5h != t5h; }
, 'r0Q': function (k0Q, I0Q) { return k0Q - I0Q; }
, 'Q3l': function (h3l, M3l) { return h3l - M3l; }
, 'h6h': function (M6h, m6h) { return M6h * m6h; }
, 'Z7h': function (A7h, z7h) { return A7h < z7h; }
, 'K7l': function (Y7l, C7l) { return Y7l < C7l; }
, 'Y0h': function (C0h, j0h) { return C0h < j0h; }
, 'h0N': function (M0N, m0N) { return M0N >= m0N; }
, 'N4l': function (P4l, X4l) { return P4l / X4l; }
, 'O6a': function (l6a, u6a) { return l6a - u6a; }
, 'u3l': function (g3l, R3l) { return g3l <= R3l; }
, 'V9Q': function (q9Q, L9Q) { return q9Q > L9Q; }
, 'L6V': function (K6V, Y6V) { return K6V > Y6V; }
, 'N9y': "L", 's1V': function (d1V, x1V) { return d1V - x1V; }
, 'O5c': function (l5c, u5c) { return l5c < u5c; }
, 'm7Q': function (t7Q, D7Q) { return t7Q - D7Q; }
, 'f2V': function (s2V, d2V) { return s2V - d2V; }
, 'G1l': function (a1l, F1l) { return a1l >= F1l; }
, 'a4c': function (F4c, S4c) { return F4c != S4c; }
, 'A5N': function (z5N, N5N) { return z5N == N5N; }
, 'F0I': function (S0I, Z0I) { return S0I < Z0I; }
, 'B0a': function (T0a, w0a) { return T0a - w0a; }
, 'm5V': function (t5V, D5V) { return t5V < D5V; }
, 'Q1h': function (h1h, M1h) { return h1h >= M1h; }
, 'e4X': function (p4X, b4X) { return p4X / b4X; }
, 'M3F': function (m3F, t3F) { return m3F == t3F; }
, 'I2F': function (y2F, J2F) { return y2F * J2F; }
, 'I8V': function (y8V, J8V) { return y8V - J8V; }
, 'h2l': function (M2l, m2l) { return M2l == m2l; }
, 'x2Q': function (E2Q, e2Q) { return E2Q != e2Q; }
, 'E3b': function (e3b, p3b) { return e3b - p3b; }
, 'U3Q': function (B3Q, T3Q) { return B3Q / T3Q; }
, 'H6X': function (n6X, i6X) { return n6X * i6X; }
, 'n0Z': "h", 'S6Q': function (Z6Q, A6Q) { return Z6Q - A6Q; }
, 'N2F': function (P2F, X2F) { return P2F == X2F; }
, 'x0Q': function (E0Q, e0Q) { return E0Q - e0Q; }
, 'S5I': function (Z5I, A5I, z5I) { return Z5I - A5I + z5I; }
, 't8c': function (D8c, U8c) { return D8c == U8c; }
, 'W9a': function (f9a, s9a, d9a) { return f9a - s9a + d9a; }
, 'A1Q': function (z1Q, N1Q) { return z1Q == N1Q; }
, 'O2a': function (l2a, u2a) { return l2a < u2a; }
, 'i4h': function (G4h, a4h) { return G4h <= a4h; }
, 'c1c': function (V1c, q1c) { return V1c * q1c; }
, 's9N': function (d9N, x9N) { return d9N < x9N; }
, 'I7Q': function (y7Q, J7Q) { return y7Q == J7Q; }
, 'b6X': function (v6X, O6X) { return v6X == O6X; }
, 'H1l': function (n1l, i1l) { return n1l == i1l; }
, 'T2c': function (w2c, r2c) { return w2c <= r2c; }
, 'J7a': function (W7a, f7a) { return W7a == f7a; }
, 'x5c': function (E5c, e5c) { return E5c - e5c; }
, 'l6X': function (u6X, g6X) { return u6X == g6X; }
, 'P1c': function (X1c, Q1c) { return X1c != Q1c; }
, 'c6I': function (V6I, q6I) { return V6I >= q6I; }
, 'S9l': function (Z9l, A9l) { return Z9l == A9l; }
, 'h5l': function (M5l, m5l) { return M5l == m5l; }
, 'P0I': function (X0I, Q0I) { return X0I == Q0I; }
, 'A8X': function (z8X, N8X) { return z8X - N8X; }
, 'x3V': function (E3V, e3V) { return E3V < e3V; }
, 'K8X': function (Y8X, C8X) { return Y8X < C8X; }
, 'B6h': function (T6h, w6h) { return T6h > w6h; }
, 'U7I': function (B7I, T7I) { return B7I - T7I; }
, 'I4b': function (y4b, J4b) { return y4b > J4b; }
, 'D3X': function (U3X, B3X) { return U3X * B3X; }
, 'B2b': function (T2b, w2b) { return T2b <= w2b; }
, 'o5Q': function (c6Q, V6Q) { return c6Q - V6Q; }
, 'K5b': function (Y5b, C5b) { return Y5b >= C5b; }
, 'P8c': function (X8c, Q8c) { return X8c == Q8c; }
, 'e7F': function (p7F, b7F) { return p7F == b7F; }
, 'y3N': function (J3N, W3N) { return J3N % W3N; }
, 'v7Q': function (O7Q, l7Q) { return O7Q - l7Q; }
, 'r8X': function (k8X, I8X) { return k8X < I8X; }
, 'q9I': function (L9I, K9I) { return L9I < K9I; }
, 'k3c': function (I3c, y3c) { return I3c == y3c; }
, 'F1F': function (S1F, Z1F) { return S1F == Z1F; }
, 'F0Q': function (S0Q, Z0Q) { return S0Q - Z0Q; }
, 'L4I': function (K4I, Y4I) { return K4I == Y4I; }
, 'U6N': function (B6N, T6N) { return B6N > T6N; }
, 'C4X': function (j4X, H4X) { return j4X / H4X; }
, 'G1b': function (a1b, F1b) { return a1b > F1b; }
, 's1l': function (d1l, x1l) { return d1l == x1l; }
, 'T3F': function (w3F, r3F) { return w3F < r3F; }
, 'l1X': function (u1X, g1X, R1X) { return u1X - g1X + R1X; }
, 'k1Q': function (I1Q, y1Q) { return I1Q == y1Q; }
, 'S2h': function (Z2h, A2h) { return Z2h != A2h; }
, 'W5Q': function (f5Q, s5Q) { return f5Q <= s5Q; }
, 'p8c': function (b8c, v8c) { return b8c == v8c; }
, 'n8l': function (i8l, G8l) { return i8l == G8l; }
, 'c4c': function (V4c, q4c) { return V4c > q4c; }
, 'v4a': function (O4a, l4a) { return O4a * l4a; }
, 'S3c': function (Z3c, A3c) { return Z3c < A3c; }
, 'Y9b': function (C9b, j9b) { return C9b * j9b; }
, 'Q4I': function (h4I, M4I) { return h4I == M4I; }
, 'w4X': function (r4X, k4X) { return r4X <= k4X; }
, 'h0a': function (M0a, m0a) { return M0a == m0a; }
, 'N6V': function (P6V, X6V) { return P6V / X6V; }
, 'e4V': function (p4V, b4V) { return p4V - b4V; }
, 'Q0X': function (h0X, M0X) { return h0X / M0X; }
, 'Z2F': function (A2F, z2F) { return A2F == z2F; }
, 'R6Q': function (o6Q, c9Q) { return o6Q < c9Q; }
, 'K6a': function (Y6a, C6a) { return Y6a == C6a; }
, 'O0c': function (l0c, u0c) { return l0c > u0c; }
, 'u3Q': function (g3Q, R3Q) { return g3Q > R3Q; }
, 'z7V': function (N7V, P7V) { return N7V / P7V; }
, 'b9N': function (v9N, O9N) { return v9N != O9N; }
, 'U8a': function (B8a, T8a) { return B8a != T8a; }
, 'Y3X': function (C3X, j3X) { return C3X - j3X; }
, 'b3b': function (v3b, O3b) { return v3b - O3b; }
, 'w6I': function (r6I, k6I) { return r6I <= k6I; }
, 't5b': function (D5b, U5b) { return D5b & U5b; }
, 'Z4I': function (A4I, z4I) { return A4I == z4I; }
, 'g2a': function (R2a, o2a) { return R2a / o2a; }
, 'T1V': function (w1V, r1V) { return w1V - r1V; }
}
; (function () {
	var o2n = S9y4F.g61.R61("5417") ? (104 < (9, 58) ? "cw" : 87. < (53.40E1, 10.02E2) ? (122.2E1, 1247357947) : 0xA8 >= (91, 0xCD) ? (41.2E1, 22.1E1) : (0x20C, 116)) : "Aroon Down", c8n = S9y4F.g61.R61("72") ? 1395258296 : "drawYAxis", V8n = S9y4F.g61.R61("d4e") ? ((1.295E3, 4.47E2) < 0x212 ? (0x105, 572815250) : (0x5, 1.431E3)) : "\r\n";
	if (S9y4F.w7h.I7h(0, 7721235) !== o2n && S9y4F.w7h.I7h(0, 5828947) !== c8n && S9y4F.w7h.I7h(15, 7879141) !== V8n) {
		this.drawLineChart(chart);
		this.mousemoveinner(x + crosshairXOffset, y + crosshairYOffset);
		return o1V != c2V;
	}
	else { var w7Z = S9y4F.g61.R61("3e") ? "tudi" : "out", u93 = S9y4F.g61.R61("6b") ? "TX" : "cy", E2v = S9y4F.g61.R61("5c") ? "STXThirdParty" : "stripPX", Q1v = S9y4F.g61.R61("3c") ? "amd" : "tagName", l7B = S9y4F.g61.R61("ba8") ? "unc" : "touchSingleClick", R5i = S9y4F.g61.R61("28ee") ? "placeMarker" : "stx", S2y = "ion", q4Z = S9y4F.g61.R61("7b") ? "littleX" : ((0x22, 16.2E1) < (140.70E1, 13.36E2) ? (51.30E1, "f") : (0x145, 0xFD)), p6v = "LegacyMarket", U3B = "S", C53 = "undefined", K1y = "e", B4M = S9y4F.g61.R61("f7be") ? "$$$" : "split", q9y = "$$", Q7i = "STXChart", N5K = S9y4F.g61.R61("217") ? "histogram" : "STX"; }
	function _stxKernel_js(_stxThirdParty, _exports) {
		var k7n = S9y4F.g61.R61("482") ? "%D Periods" : 62651418, I7n = -1578031890, y7n = 1083249841; if (S9y4F.w7h.I7h(((53.7E1, 52) < 0x1C9 ? (52, 0) : (103, 0x52) <= (82, 71.) ? (90.4E1, 65) : 0x101 <= (114, 0x35) ? 365 : (7, 4.)), 3288058) !== k7n && S9y4F.w7h.I7h(0, 9587881) !== I7n && S9y4F.w7h.I7h(15, 8370624) !== y7n) {
			stx.startClip(panel.name); stx.undisplayCrosshairs(); return function (e) { self.resizeChart(); }
			;
		}
		else {
			var t6K = "\r\n", u53 = S9y4F.g61.R61("e158") ? "touchmove" : 20000, K2Z = "eed", a5y = "oteF", Y6v = S9y4F.g61.R61("c5") ? "url" : "open", N1v = S9y4F.g61.R61("8247") ? "BarChart" : "exportLayout", H0i = "QuoteFeed", c9Z = "setMarkerTick", s4v = "reset", f0Z = "zIndex", O9i = "0px", r9v = "absolute", k7v = "markers", z8K = "start", M8M = "hted", V3K = "n_", l8M = "comparison_stop", Y78 = S9y4F.g61.R61("df") ? "touchSingleClick" : "startPlugin", U2v = "Axis", Z1K = S9y4F.g61.R61("42a") ? "_m_values" : "priceFormat", x38 = "iso", c1i = S9y4F.g61.R61("bb3") ? "par" : "lw", v58 = S9y4F.g61.R61("a15") ? "Driver" : "eate", b88 = "1h", w0v = "isComparison", M58 = "nSeg", x48 = "ari", f1y = "Comp", C23 = "stopSort", F7i = "percentToPrice", w8i = "baseline", V6v = "priceToPercent", E7y = "pari", q1M = S9y4F.g61.R61("e78") ? "Com" : "prevRight", e3y = S9y4F.g61.R61("885") ? "sort" : "xy", x53 = "profileRange", a9y = "twoClicked", c6Z = "profile", j4i = "bellcurve", z5v = "replaceFields", b4y = "setOuter", N0y = "xIntersection", A98 = "level", t2K = "fibs", B6i = "outer", b4v = "lw", p6M = "mapping", z4K = S9y4F.g61.R61("fdc1") ? "oP" : "TASDKConst", y2K = S9y4F.g61.R61("cbc") ? "aseT" : "touch2", k2Z = "fibonacci", w6v = "fillColor", R33 = "oint", q4M = S9y4F.g61.R61("5a") ? "ellipse" : "volumeROC", V4v = "boxIntersects", Z7i = "freezeTick", y7K = S9y4F.g61.R61("bde") ? "fibColor" : "freeze", D1y = "intersect", o3K = S9y4F.g61.R61("45") ? "pixelFromDate" : "fib", m58 = S9y4F.g61.R61("ce58") ? "intervalRatio" : "y1", B5i = S9y4F.g61.R61("ca84") ? "getCanvasColor" : "nodes", S63 = "rossh", D18 = "pNodes", e7M = "startY", G3M = "startX", r88 = S9y4F.g61.R61("fad") ? "copyField" : "lowY", p7M = "hiY", o88 = "lowX", f3M = "hiX", q83 = S9y4F.g61.R61("edb") ? "Low High" : ((101, 9.56E2) <= 13.20E1 ? (90., "v") : (18, 74) < 9.83E2 ? (100, 0.3) : (0x37, 1.23E2) < (33., 66.) ? 0x5A : (0x144, 109)), i4Z = "splineTension", q3y = "freeform", d1i = "eco", T0v = "accidentalClick", g08 = "continuous", m43 = S9y4F.g61.R61("acf") ? "awing" : "_stxKernel_js", m5K = S9y4F.g61.R61("83") ? "currentVectorParameters" : "beginDay", S48 = "currentColor", y0M = "axisLabel", h9y = "ray", W9i = "d0B", d28 = S9y4F.g61.R61("b41") ? "m_Volume" : "ptrn", m0Z = S9y4F.g61.R61("782") ? "v1" : "", K0i = "d1", L58 = "penDown", t68 = "d1B", y13 = S9y4F.g61.R61("2f") ? "0B" : "bc", E23 = "v1B", h6y = "v0B", w5v = S9y4F.g61.R61("377") ? "segment" : "tickDistance", N4K = S9y4F.g61.R61("54") ? "p1" : "?type=dailyContinue", u1i = S9y4F.g61.R61("716") ? "timeZoneOffset" : "bg", X4K = "pnl", t3Z = S9y4F.g61.R61("83") ? "col" : "lastTick", x0Z = S9y4F.g61.R61("3b") ? "stx_candle_shadow" : "v0", e2K = "dateFromTick", T0i = "d0", E8v = "copyConfig", U5Z = "focus", q2i = "annotationCancel", F5M = "annotationSave", V5v = "borderColor", H0M = S9y4F.g61.R61("d42") ? "stem" : "performance", F0i = "pixelFromValueAdjusted", m3K = S9y4F.g61.R61("1d4") ? "logHigh" : "BaseTwoPoint", s7B = "stxInheritsFrom", L93 = "annotation", o0Z = "ult", L3B = S9y4F.g61.R61("ffce") ? "oldWidth" : "R", M7i = S9y4F.g61.R61("34") ? "initialize" : "displayCrosshairs", j0M = S9y4F.g61.R61("6ce") ? "transitionMS" : "Field", n08 = "_passToModulus", F6v = "ud", K3Z = S9y4F.g61.R61("ad2") ? "#808000" : "DI-", E9i = "#00FF00", C0Z = "#FF0000", U2i = S9y4F.g61.R61("3f2c") ? "stroke" : "#0000FF", O2Z = 52, p4Z = 26, Z3K = "displayIchimoku", k8Z = "udi", r43 = "bypass", r5Z = "Ichimoku Clouds", x68 = "tick", e2Z = "ku", g43 = "himo", c0M = "ayIc", Q38 = "isp", w3Z = "futureB", u3Z = "futureA", h5Z = "calculateIchimoku", E1v = "ame", T3Z = "mi", r1Z = "_calculateStochastics", u0y = "_calculateRSI", f78 = "3V", t6v = "7V", B1M = "_calculateMovingAverage", I4K = "calculateMovingAverageExponential", d53 = "vin", x1K = "StudyDescriptor", a9Z = "days", S1K = "MAC", N1y = "ulat", z0y = "endDate", f48 = "moreAvailable", h18 = "fetch", w8v = "startDate", R0y = "makeParams", f6K = "vi", j7i = "callback", z83 = "announceError", b23 = "quotes", U1M = "die", M0K = "intervalTimer", M93 = "loadingNewChart", y6v = "behavior", j18 = "quoteFeed", F4i = "Driver", h13 = "eri", B63 = "od", O9Z = "outputs", q1v = "inputs", N88 = "percent4", E28 = "percent2", U28 = "percent1", H28 = "percent0", g5M = "nte", U0Z = ((44, 13.13E2) <= 0xF3 ? (128, 0x1F5) : (0x11A, 0x1C) <= (0x22E, 111.) ? (6.4E1, .9) : (0x46, 24.1E1)), y58 = .25, r2M = 1.1, y23 = "Si", w2y = "adjust", r6K = "studyLibrary", r1y = "scrubbed", f7B = "sc", L0M = "lose", y43 = "os", Q4v = "consolidatedQuote", p5K = "win", w9Z = "arr", P0Z = "charAt", x5M = "concat", u58 = "center", V9M = "middle", X1Z = 20, C48 = "object", u23 = "stx_watermark", U13 = "scrollTo", j9M = "scrollEvent", R2M = "mouse", Q0i = "stop", n0y = "pointerType", i0M = "setPeriodicityV2", R8K = "all", d5v = "momentumDistance", v2v = "momentumTime", H9y = "si", S6i = "kF", T3M = "eA", t8K = "touchMoveTime", d8i = "twoFingerStart", t7v = "cancelSwipe", m98 = "touchingEvent", y7y = "ignoreTouch", N8Z = "period", i7M = "grabStartPeriodicity", I2y = "grabEndPeriodicity", U7v = "grabStartValues", U0v = "goneVertical", p6y = "moveCount", C1M = "y2", k4K = "x2", s0K = "x1", M0M = "pt", I9v = "clea", z18 = "gSc", O8K = "nc", i9M = "pinchingScreen", Q2M = "moveA", h8M = "Ti", w8M = "moveB", T0y = "crosshairYOffset", f6i = "crosshairXOffset", I7B = "changedTouches", r83 = "movedSecondary", F58 = "movedPrimary", J5K = "touc", i43 = "sqrt", D3M = "top", c7v = "detail", B88 = "pointerId", c0Z = "mouseMode", G68 = "e2MS", a7y = "s1MS", d38 = "e1MS", q8y = "s2MS", q73 = "touchDoubleClick", v4Z = "ts", F4K = "p0", M1M = "clicks", G2y = "editingAnnotation", i6v = "touchSingleClick", Z4v = "displayPanelResize", F6i = "displayIconsClose", Z0i = "displayIconsUpDown", W9v = "up", Y1y = "title", d4M = "ren", z33 = "adjustDrawings", W88 = "topOffset", G0K = "ns", o4Z = 30, g3K = "resolveY", h6K = "per", p3y = "solo", j1M = "nam", e9Z = "savePanels", m0i = "showCrosshairs", l3y = "privateDeletePanel", H23 = "panelSolo", e4i = "soloing", C4Z = "panelClose", j7K = "closeX", s1v = "icons", H1M = "storePanels", U8M = "pl", D4K = "mouseWheel", Z5Z = "onmousewheel", K38 = "touchstart", L6Z = "iphone", Q3B = "zoomOut", V28 = "touchend", Z9y = "touchmove", D6M = "est", J13 = "gestureInEffect", P0M = "zoo", q2Z = "zoomIn", v0i = "onmouseup", O58 = "mou", a8K = "spl", G63 = "touching", n93 = "touches", Y3K = "event", o48 = "addEventListener", o9v = "markerHolder", M2v = "Out", k5y = "se", O2y = "eou", f7Z = "uc", W73 = "ontouchend", A5M = "onmspointerup", t2Z = "symbolDisplay", x5K = "stackPanel", l0i = "ontouchstart", E63 = "position", z4Z = "manageTouchAndMouse", Z2M = "isSurface", E6i = "locale", L9K = "split", m2y = "setDate", Z8i = "setMonth", J4i = "setFullYear", e2y = "padding", G0M = "pa", V9Z = "isEmpty", i5i = "app", o6Z = "now", I5i = "appendMasterData", t88 = "Stream", L7v = "displayZone", b2i = "dataZone", u9i = "setDisplayDates", x98 = "rva", u3y = "initializeChart", M6Z = "setMasterData", X9y = "adjustPanelPositions", l9M = "resizeCanvas", x9i = "cks", r73 = "setCandleWidth", O3Z = "yaxisWidth", m2i = "tyl", P4K = "no", I1v = "drawCurrentHR", l58 = "drawVectors", b68 = "Studies", O3K = "drawSeries", n4Z = "displayChart", j6v = "createVolumeChart", z9i = "drawXAxis", B0K = "createXAxis", U7y = "initializeDisplay", m4i = "createDataSegment", t2i = "rr", J1Z = "#FFFFFF", j73 = "#000000", k43 = "whichSet", u3M = "roundRect", M13 = "pane", V3v = "Ed", h1K = "nva", F6Z = "volume", Q8i = "yp", B9y = "aw", c13 = "or", t7y = ((65., 93) > 6. ? (0xA, "U") : (135, 6.34E2)), p5Z = "containerColor", Q9Z = "getCanvasColor", c8i = "yo", J33 = "Cha", P28 = "lor", V1Z = (0x1FE > (37, 4.61E2) ? (1.072E3, 32) : 85. < (0x160, 42) ? (90, "p") : 0xF0 <= (0x1E9, 79) ? "p" : (0x131, 0x9A)), n18 = "plugins", y93 = "U8", k1K = "endClip", D0v = "startClip", c4v = "ing", u4M = "dr", t5i = "hideDrawings", h7M = "vectorsShowing", c1Z = "ks", m4M = "quoteDriver", g7v = "va", o7y = "al", L98 = "isD", Q2y = "drawLegend", a43 = "fo", e2M = "de", L7M = "legend", b58 = "removeSeries", v48 = "emo", C58 = "ie", a78 = "masterData", l4i = "ste", r48 = "type", H2M = "clone", S6K = "chartName", g98 = "dS", i4K = "studies", b6M = "field", X7y = "removeOverlay", j5K = "pen", Y7y = "ai", r4y = "ss", a4v = "grabbingHand", W6M = "and", v43 = "grabStartCandleWidth", i13 = "gS", F1i = "bi", U9v = "Mo", R6y = "displayCrosshairs", T8M = "eC", C2v = "mousedown", e18 = "appendClassName", o13 = "drawingClick", q0M = "eX", Y2M = "mouseup", o7v = "deleteHighlighted", y4y = "button", u8v = "which", i9Z = "end", Y2y = "stx-drag-chart", e58 = "unappendClassName", y68 = "rD", z3v = "_c", J1y = "addDrawing", N48 = "Ca", V9i = "tem", N03 = "vas", N68 = "rC", H6M = "ea", f18 = "cl", B23 = "es", K4Z = "userPointerDown", G5i = "chartsOnly", p0v = "Dr", f1M = "dra", g7K = "lineDashOffset", B28 = "setLineDash", p6Z = "art", f4Z = "stxLine", A7v = "opacity", P8M = "y1", c8M = "y0", b0K = "x0", Y8y = "Z", F9v = "ine", L23 = "yIntersection", U58 = "pattern", s3Z = "pop", q5K = "undo", X3v = "ratio", B98 = "pixelFromPriceTransform", X7B = "transformFunc", k3y = "untransformFunc", S68 = "els", w0K = "priceFromPixel", x4K = "tickFromDate", x8Z = "pixelFromTick", J6v = "lay", Z98 = "can", v2y = "utX", z2y = "ac", i3y = "ld", V5K = "displ", l83 = "highlighted", f0v = "handle", d1M = "res", K5K = "line", h0i = "plotLine", U9i = "Dra", W2v = "translationCallback", D0K = "%", a7K = "percent", G8Z = ((7.73E2, 0x233) >= 146. ? (11, 10000) : (145, 21)), z8M = 100, M73 = "setMeasure", r5K = (5.5E1 <= (9.370E2, 0x1B1) ? (0x158, "-") : (2.14E2, 28.90E1)), R4y = "sp", X1v = "inline-block", N2v = "chooseForegroundColor", r8Z = "backgroundColor", j33 = "sty", t8i = "ba", I5M = "touchDevice", o8K = "children", B83 = "mSticky", Z7K = "4", R2Z = 50, n3y = "Wi", g5y = "as", O2M = "anv", w6K = "parameters", X18 = "ht", d03 = "lig", K23 = "ov", T1Z = "4c", b2v = "isStep", a83 = "ed", s5Z = "li", S78 = "yValueCache", N6M = "ane", S9i = "re", G3K = "outputMap", Q8Z = "ver", J2K = "libraryEntry", a5M = "B0", W33 = "overlays", d3M = "permanent", c43 = "magnetize", c98 = "findHighlights", d78 = "drawTemporaryPanel", e0y = "resizePanels", h03 = "measure", m9y = "tI", o18 = "valueFromPixelUntransform", z4M = "panelName", Y9K = "ng", O23 = "elF", M1i = "ix", u98 = "cr", i2y = "su", A9i = "render", M83 = "oi", h5y = "Panel", T53 = "nce", U98 = "grabStartZoom", F83 = "span", y1v = "whitespace", S8K = "dth", u4K = "cand", m4K = "mPix", w9M = "ha", j3M = "pinchingCenter", y48 = "ipadMaxTicks", Q7v = "ipad", M9M = "dt", Y3y = "W", i4M = "dl", f4M = "gr", z6v = "ctrl", Y4i = "grabOverrideClick", I98 = "yToleranceBroken", N9i = "yTolerance", O1K = "gra", K1v = "grabStartScrollY", F8y = "grabStartY", h1v = "grabStartScrollX", V8y = "grabStartX", K4y = "abS", k5i = "hart", Y6Z = "displaySticky", L88 = "highlight", U7i = "ys", f8v = "ve", x4y = "clearCanvas", c3v = "anyHighlighted", n8Z = "resizingPanel", X2i = "rs", C7Z = "la", u9y = "so", f4y = "cur", Q93 = "grabbingScreen", L13 = "insideChart", j7y = "canvasRight", E9K = "urre", p5y = "adjustIfNecessary", B13 = "crosshairValue", o43 = "crosshairTick", C6Z = "nel", p1v = "tPa", s33 = "whichPanel", u2y = "backOutY", E0M = "iner", r2v = "ut", S13 = "eo", w5M = "setInterval", Z2Z = "clearInterval", k8y = "resizeChart", D2v = "clientWidth", M03 = "clientHeight", t28 = "container", j68 = "devicePixelRatio", H1K = "isAndroid", x3y = "resizeDetectMS", l8v = "mousemoveinner", g2v = "mousemove", Q18 = "scrollTop", O3M = "clientY", j5Z = "pageY", v5M = "documentElement", f4K = "scrollLeft", T88 = "clientX", X3y = "pageX", C4y = "headsUpHR", a18 = "canvasHeight", l53 = "of", a8y = "backOutX", V1M = "px", M6K = "offsetHeight", P93 = "crosshairY", s2v = "parentNode", o28 = "getPos", b93 = "lastAccessoryUpdate", h4K = "accessoryTimer", L9i = true, Y4M = "openDialog", Y83 = "auto", y8M = "pla", A2y = "oss", z98 = "block", H8M = "none", d0i = "cursor", V7M = "magnet", l1Z = "preferences", q68 = "style", G5v = "display", M68 = "dragToDraw", D63 = "undisplayCrosshairs", n2v = "crosshair", a9i = "displayInitialized", z63 = "doDisplayCrosshairs", O0M = "rep", w7B = "an", u28 = "tempCanvas", X8i = "pix", Y93 = "crosshairX", U3y = "tickFromPixel", t7K = "magnetizedPrice", W7M = "swapClassName", N8K = "7", W5M = "ec", M9Z = (109. > (137., 0x251) ? 2. : (114, 5.84E2) < (46.1E1, 132.3E1) ? (2., "j") : (0x228, 124.5E1)), z23 = "vertical", A8Z = "horizontal", m7M = "vectorType", G53 = "drawingLine", n43 = "stx_crosshair_drawing", C08 = "stx_crosshair", j3v = "con", A1K = "hourMinute", D98 = "cx", K8M = "barFromPixel", G9v = "floatDate", e5M = "xe", e38 = "rom", p8K = "floatHR", n58 = "cy", W1y = "currentPanel", l0Z = "mP", f0y = "Fr", b73 = "el", j6M = "pi", y4Z = (147. <= (0xE4, 0x118) ? (90., 40) : (0xC5, 0x1CE)), C43 = "plotLineChart", h7Z = "ach", g2Z = "aSe", K03 = "createYAxisLabel", y5M = "hi", A33 = "he", i6Z = "ti", i1Z = "tt", N9M = "yA", I6y = "skipProjections", V6i = "sC", S73 = "op", g83 = "ayou", V4y = "H", B2K = ((1.140E2, 0x44) < 0x1BD ? (2.02E2, "B") : 0x1FD < (40, 1.29E2) ? (1.426E3, 0x5) : (106, 0x1D3)), a2M = "0b", z5K = "igh", O1M = "offset", J6y = "J", a3v = "Low", P5y = "High", L28 = "los", X7Z = "vC", t0Z = "to", Q73 = "tmpWidth", F9Z = "close", h6i = "open", w5Z = "cache", W9K = "iqPrevClose", H43 = "en", G2K = "C", Y88 = "Close", q6v = "Open", k3Z = "projection", W0i = "pan", c9i = "bott", m7y = "computePosition", P8K = "ne", u6i = "stx_candle_shadow", X53 = "stx_candle_down", Z3Z = "stx_candle_up", x0y = "splay", v4K = "createYAxis", t9K = "clearPixelCache", E5v = "pow", B4i = "alue", U5M = "Value", K18 = "highValue", l5v = "ue", F0Z = "abs", D4M = "pu", v9Z = "bottomOffset", C3B = "am", b8i = "shareYAxis", B9i = "series", x9K = "nv", q9i = "In", R48 = "co", N3K = "8", r3y = "le", Z43 = "ot", D5y = "N", H7y = ((0x1E4, 1.374E3) >= (1.074E3, 0x173) ? (128, "V") : (78.9E1, 26.8E1)), W5v = "translateIf", A9y = "hidden", w2K = "panels", e43 = "Volume", H3M = "volumeMax", b63 = "preventDefault", Y73 = "crossY", U4M = "onmousedown", K33 = "crossX", q9M = "cont", u63 = "createCrosshairs", W3B = "ceF", r4i = "iz", y8K = "tio", X7K = "na", Y1Z = "Pa", m68 = "cu", f5M = "toFixed", E4v = "priceFormatters", m28 = "condenseInt", B2i = 1000, M0Z = .1, o58 = .01, Z3y = "", M3v = "ext", r2y = "_", F2Z = "tx", D58 = "id", Z9K = "yaxisLeft", e5Z = "canvasWidth", Y2v = "formatYAxisPrice", o73 = "priceFormatter", L5i = "ter", M38 = "rm", d33 = "xi", N0Z = .5, o4K = "pixelFromPrice", W1Z = 10, a63 = "og", a88 = "iL", I43 = "em", X3K = "roundit", G7M = "di", M23 = "ou", m5y = "stx_yaxis", u0Z = "lo", Q1y = .499, P98 = "yAxisPlotter", Q28 = "drawYAxis", z1Z = "decimalPlaces", k7Z = "w", W2y = "ad", t9y = "sh", E13 = "ow", y6K = "0", u6K = "1", X5M = "valueFromPixel", S4y = "multiplier", F28 = "ce", F6y = "P", k0v = "um", b18 = "ck", w3v = "eTi", V08 = "pri", L9v = "floo", j98 = "ic", C1v = "priceTick", E6K = "Pix", L0i = "ze", O5v = "logShadow", R5v = "logLow", c0i = "LN10", l98 = "logHigh", g23 = "activeDrawing", x4i = "semiLog", s58 = "ig", O3B = "shadow", E73 = "om", g28 = "zo", n73 = "oo", V58 = "high", L8y = "max", c7i = "cacheRight", Y38 = "cacheLeft", f2K = "cacheLow", W58 = "low", p3Z = "cacheHigh", h63 = "gh", h2K = "noChange", K2i = "rt", r63 = "cha", j83 = "ef", e5i = "ri", N4M = "grid", g6v = "xaxisHeight", z88 = "ca", m9Z = "newSeries", Z83 = "Plotter", L0Z = "right", K1Z = "left", J78 = "text", l4M = "canvasFont", L3K = "9", c9y = "K", r8K = "6", g5Z = "q", j0i = "getMonth", i88 = "format", m1K = "monthDay", w5y = "at", M8K = "int", p4M = "internationalizer", n0v = "un", b8K = "5", a9v = "ur", S8M = "gi", h2i = "be", H2y = "ate", d93 = "ex", u1K = "displayDate", i2i = "har", i8v = "ma", C2Z = "bottom", X88 = "getCanvasFontSize", n8K = "candleWidthPercent", z0Z = "floor", y7B = "rou", S1Z = "ceil", d9y = "E", n4v = "getFullYear", Q6Z = "th", c7K = "getDate", i9y = "ax", q3B = "dataSegment", g4y = "xaxis", e7y = "X", C9i = "candleWidth", U2Z = "ty", V5M = "pe", a53 = "men", V73 = "eg", o1y = "ataS", Q8K = "timeZoneOffset", U0i = "3F", Q8y = ((28.3E1, 106.) >= 147 ? 133 : (106., 144.1E1) <= (99., 0x123) ? 'D' : (0, 102) < 0x95 ? (27, "Y") : (8.5E2, 0x199)), v63 = "dat", P9i = "runAppend", n5K = "yAxis", v73 = "panel", g9K = "calculateYAxisMargins", H58 = "maxTicks", d5y = "min", v6Z = "ll", M18 = "charts", P7y = "ta", s0M = "cancelTouchSingleClick", G5Z = "runPrepend", i2v = "scroll", m4v = "initialMarginBottom", B9v = "initialMarginTop", f08 = "zoom", r3M = "month", X83 = "week", D93 = "day", F8i = "io", T7M = "pr", e5K = "symbol", S3Z = "cyM", T2Z = 60, S3B = 9, H8y = "getDay", W2K = "o8", t9M = 60000, f3y = "te", G5y = (1.035E3 >= (99., 0x169) ? (70., "M") : 14.98E2 < (0x67, 123) ? "D" : (0x91, 0xA8)), I13 = "er", X6y = "I", V2i = "is", H0K = ((0x79, 25.) < (4.75E2, 0x83) ? (1.399E3, 1500) : (92.9E1, 0x92) <= 1.40E1 ? 35 : (0x105, 3.61E2) < (29., 88.) ? (70.7E1, 250) : (0x3B, 0x13F)), h9i = "minute", M3M = "strToDateTime", v5v = "me", P7Z = "x", e3M = "da", T6v = "a8", E08 = "round", D08 = "Da", o53 = "ge", R0i = "setMinutes", m7v = "setHours", Q4y = ((3.29E2, 125.2E1) <= 1.2590E3 ? (141.1E1, "b") : (3.97E2, 86.10E1)), g0v = "minutesInSession", E8K = "beginMinute", O5Z = "getMinutes", E9Z = "beginHour", J3v = "getHours", h0y = "ute", u68 = "getTime", R8i = "im", Y0Z = "nextMonth", S0v = "ont", Y9Z = "m", v3K = "nextWeek", r7B = (40 < (36, 51.) ? (6.850E2, "Q") : (16.3E1, 23.70E1)), O9M = "nextDay", Q3v = "nextPeriod", d9Z = "k", U3M = "DT", X6M = "prevMonth", T5M = "prevWeek", K9v = "prevDay", t0v = "prevPeriod", X68 = "ket", H3v = "Ma", E5Z = "isDailyInterval", B4v = "yyyymmddhhmm", l3B = "T", g9y = "D", L1y = "ata", a03 = "Date", B6K = "dataSet", y2Z = "periodicity", l2M = "interval", j7Z = "splice", u08 = "ct", u2i = "ru", O4y = "st", h73 = "on", j3K = "createDataSet", l68 = "vector", n0K = "abortDrawings", m6K = "undoStamp", m4Z = "cts", b5y = "O", A4Z = (0x1C2 >= (0x228, 142) ? (6.24E2, "g") : (59.0E1, 0x15F)), K7M = "wi", A0i = "ra", N7Z = "Drawing", s5i = "name", E6y = "raw", E8Z = "z", e8Z = "push", L8M = "drawingObjects", y4i = "volumeUnderlay", b0v = "out", D0y = "ay", J6Z = "l", j23 = "et", Z5i = "cre", q5y = "ar", r28 = "ch", P8v = "adj", v4y = "changeOccurred", c2y = "draw", c88 = "chartType", v3Z = "layout", k6v = "currentlyImporting", a0y = "canvasColor", s9M = "registerDrawingTool", G0y = "F", w8K = "nd", k5Z = "p", B3B = "ap", q38 = "apply", j8Z = ((0x76, 0x5E) <= (65, 1.294E3) ? (0xC8, false) : 77 > (0x140, 0xAA) ? 1.90E1 : (125., 0x15)), Z0M = "hideDates", i1y = "stripPX", Z2i = "it", E5K = "defaultColor", g58 = "isTransparent", J2y = "color", e48 = "log", K0M = "indexOf", I38 = "fontSize", V2v = ((0xFD, 19.) <= 0x1D3 ? (88, " ") : 0x132 <= (61.0E1, 0xFE) ? "%K" : (116., 11.02E2)), U83 = "context", j2M = "canvasStyle", n9y = "removeChild", q7Z = (9 > (0x191, 0x204) ? (0x50, 71) : 90.2E1 <= (0x24F, 9.28E2) ? (8.6E1, "y") : (0x159, 0x1FB)), u4y = "d", Y0i = "bo", L68 = "className", m63 = "div", r1v = "styles", s53 = "toUpperCase", y1K = "makeCamelCase", B2Z = "onclick", z2v = "home", r4Z = "tr", B3v = "ove", f6v = "us", l0v = "mo", c53 = "onmouseout", d73 = "onmouseover", l73 = "#zoomOut", F2v = "ls", U8i = "ro", U0K = "nt", x9Z = "#zoomIn", p8Z = "chartControls", B73 = "appendChild", x1M = "innerHTML", c2M = "DIV", i68 = "createElement", E0y = "controls", v9K = ((107, 17) >= 43 ? 0xD2 : (14., 0x206) >= 0x19F ? (46, "#") : (7.30E1, 71.)), Y33 = "ol", G7i = "in", I4y = "a", a6Z = "n", B6Z = ((10.67E2, 0x1E9) >= (0xE9, 67.) ? (0x159, "o") : (48, 19)), j1y = "c", n48 = "chart", T2v = '>--></', t4v = 'di', e1i = '><!--<', y0v = 'los', u7v = 'w', h3K = 'us', p1M = 'oc', Q33 = 'nt', A9v = '> ', L1i = 'tyl', Y7K = 'co', M5y = 'as', f5y = 'at', o5v = 'oat', Z1M = 'ispla', w7K = 'yle', r7v = '_tod', j63 = 'mp', j08 = '_j', o08 = 'om', P73 = 'mIn', q5Z = '><', J03 = '">-</', y3v = 'u', O63 = 'mOut', S08 = 'oo', M4v = 'z', F3K = 'ze', O33 = ((70., 1.323E3) < 129 ? 'I' : (1., 0x257) > 2.90E1 ? (1.026E3, 'S') : (1.3E1, 123.)), E1K = ';"><', K7i = '2px', R3K = (44.1E1 <= (0xEC, 136) ? 6.94E2 : 10. < (3.36E2, 1.76E2) ? (68., '2') : 0x1C0 <= (82, 75) ? "e" : (0x17F, 116)), F5K = 'tt', S4M = '; ', R6Z = 'lock', M9y = 'ay', z6i = 'pl', O7K = 'ls', B5Z = 'ro', w08 = 'on', c8Z = 'ai', q3K = 'rossh', I7y = 'tx_', J4v = 'sha', W3M = 'os', A6i = 'ass', u0K = 'splay', s3M = '_x', z3B = 'ir', a4Z = 'ssha', j4Z = 'cro', q2M = (52.7E1 >= (112.7E1, 49.) ? (0x1A4, '_') : (75, 11.14E2) <= 0x6E ? (57.30E1, "pt") : (1.061E3, 82.)), x8i = 'ha', R7K = 'oss', j2y = 'tx_cr', J7Z = ';"></', y5i = 'one', p9M = ': ', e7B = 'is', i6y = 'ric', E38 = 'loat', C4M = 'f', f83 = 'las', Y0y = 'iv', N1Z = '>)</', L9M = 'elet', j7M = 'ick', S7M = 'g', h2y = '>(</', b7y = 'truct', d5M = 'ns', e4v = 'eI', i53 = 'et', r93 = 'el', j13 = 'D', J4M = 'ouse', p5i = 'pan', t8y = '></', n0i = ';</', D8y = '">&', N2K = 'rash', E3v = '"><', Q43 = 'ne', w43 = 'lay', m8Z = 'sp', b43 = 'C', r7M = ((55, 0x6F) <= (6, 2E0) ? (133, "c") : 9.4E1 <= (85, 0xE1) ? (0x1C3, 'h') : (7, 0x51)), a3M = 'yTras', d1K = 'verl', i0Z = '> <', E5M = '"></', Z8v = 'r', E2M = (134 > (10.78E2, 40.5E1) ? (8.1E1, 137) : 0x149 >= (9., 100) ? (124, 'o') : (0x1CB, 0x25) >= 0x118 ? (132, "pd") : (85.60E1, 110)), T7y = 'ri', R4v = 'te', W1M = 'StickyIn', Y53 = '"> <', J1v = 'y', j8M = 'k', x3Z = 'Stic', f7v = 'v', x8M = 'i', e4M = (1.127E3 > (124., 6.45E2) ? (5.13E2, 'd') : (98., 72.)), l6y = 'anc', t6Z = ';">', S1v = 'x', U4i = '0p', X63 = '1', X93 = ((42.80E1, 120.) >= 0x178 ? (0x131, 104.7E1) : (93.2E1, 69.) <= 75.7E1 ? (0x17E, ':') : (50.5E1, 117)), T33 = 'ft', B8M = 'l', b7v = 'argi', X2M = 'm', K1K = 'le', N6K = 'ty', a58 = '" ', J4y = 'ncel', o1i = '_c', t3v = 'tion', X9Z = 'not', N2i = '_a', t48 = 'lass', Z88 = 'pa', r13 = '>', d7B = 'an', D3K = '</', n9Z = 'ave', d3B = '">', J0M = 'e', F03 = 'sav', Q23 = 'n_', i5y = 'io', l8i = 'annotat', c4M = 'x_', F3v = 't', C8v = 'tn', y1M = 'b', Z63 = '-', O5K = 'tx', E4K = '="', n3Z = 'ss', o0v = 'la', h4M = 'c', f0i = ((5.850E2, 2.5E1) != 25. ? 48. : (0x130, 86.) < 7.94E2 ? (11.78E2, ' ') : (3.49E2, 8.06E2)), s2M = ((0x12D, 3.35E2) >= 0x213 ? 'r' : 0x10F <= (0xE5, 94.9E1) ? (43., 'n') : (0x72, 0x16C)), A1M = 'a', q7v = (107 > (147.5E1, 7.49E2) ? 0x244 : 23. < (89., 0x22F) ? (1.0130E3, 'p') : (13, 1.073E3) >= 129.4E1 ? (0x257, 0x54) : (0x34, 0x146)), J8v = (69. > (6.42E2, 53) ? (81.2E1, 's') : (112., 0x21D)), p93 = (122. < (14.6E2, 0x131) ? (0x19B, '<') : 0x52 >= (6.4E1, 0x152) ? (0x214, 'k') : (82., 57.5E1)), l88 = "htmlControls", D6i = "body", l3M = "target", F7M = "gesture", Z6K = "gesturePointerId", L7Z = "ace", l38 = "rf", B3y = "u", h58 = "isS", d7K = "timezoneJS", u4i = "plotSpline", o98 = "CLOSEUP", w0M = "CLOSEDOWN", J1K = "CLOSEEVEN", l0M = "CANDLEUP", b1v = "CANDLEDOWN", B5v = "mouseHasMoved", t5K = "Comparison", J48 = "currentZindex", t98 = "Markers", L1F = function (K1F) {
				var F51 = 466811820, S51 = 1695279035, Z51 = 115236858; if (S9y4F.w7h.I7h(0, ((111., 80.60E1) >= (104, 12.3E1) ? (0x42, 9168776) : (137.0E1, 116))) !== F51 && S9y4F.w7h.I7h(((0x10, 40.5E1) >= 9.60E1 ? (133, 0) : (1.274E3, 19) > (1.043E3, 142) ? "C" : (95, 0x216) < (46, 0x1C2) ? (1.245E3, 'C') : (130, 0xD9)), 6129042) !== S51 && S9y4F.w7h.I7h(15, 9404960) !== Z51) { d.addField(f); context.lineTo(x1, y0); return D5b & U5b; }
				else { STX[t98][J48] = K1F; }
			}
			, V1F = function (q1F) { STX[t5K][B5v] = q1F; }
			, o4F = function (c1F) { var c9M = "CANDLEEVEN"; STXChart[c9M] = c1F; }
			, g4F = function (R4F) { STXChart[b1v] = R4F; }
			, l4F = function (u4F) { STXChart[l0M] = u4F; }
			, v4F = function (O4F) { STXChart[J1K] = O4F; }
			, p4F = function (b4F) { STXChart[w0M] = b4F; }
			, E4F = function (e4F) { STXChart[o98] = e4F; }
			, d4F = function (x4F) {
				var O61 = 1345083005, l61 = 221056471, u61 = 420987990; if (S9y4F.w7h.I7h((57.2E1 >= (0x98, 72) ? (18.7E1, 0) : (143, 44.1E1) <= 108. ? 1.98E2 : (0x151, 81)), 6355945) === O61 || S9y4F.w7h.I7h(0, 1319252) === l61 || S9y4F.w7h.I7h(15, 3255842) === u61) { var G1y = "NONE"; STXChart[G1y] = x4F; }
				else { stx.setTransform(chart, STX.Comparison.priceToPercent, STX.Comparison.percentToPrice); this.initializeDisplay(chart); return Y2Q > C2Q; }
			}
			, plotSpline = _stxThirdParty[u4i], timezoneJS = _stxThirdParty[d7K], STX = _exports[N5K], STXChart = _exports[Q7i], $$ = _exports[q9y], $$$ = _exports[B4M]; STXChart.prototype.plugins = {}
			; if (STX[(h58 + B3y + l38 + L7Z)]) {
				var f4F = function (s4F) { STX[Z6K] = s4F; }
				, J4F = function (W4F) { STX[F7M][l3M] = W4F[D6i]; }
				; STX[F7M] = new MSGesture; J4F(document); f4F(S9y4F.o6i);
			}
			STXChart[l88] = { "annotationSave": (p93 + J8v + q7v + A1M + s2M + f0i + h4M + o0v + n3Z + E4K + J8v + O5K + Z63 + y1M + C8v + f0i + J8v + F3v + c4M + l8i + i5y + Q23 + F03 + J0M + d3B + J8v + n9Z + D3K + J8v + q7v + d7B + r13), "annotationCancel": (p93 + J8v + Z88 + s2M + f0i + h4M + t48 + E4K + J8v + O5K + Z63 + y1M + F3v + s2M + f0i + J8v + O5K + N2i + s2M + X9Z + A1M + t3v + o1i + A1M + J4y + a58 + J8v + N6K + K1K + E4K + X2M + b7v + s2M + Z63 + B8M + J0M + T33 + X93 + X63 + U4i + S1v + t6Z + h4M + l6y + J0M + B8M + D3K + J8v + q7v + A1M + s2M + r13), "mSticky": (p93 + e4M + x8M + f7v + f0i + x8M + e4M + E4K + X2M + x3Z + j8M + J1v + Y53 + J8v + q7v + A1M + s2M + f0i + x8M + e4M + E4K + X2M + W1M + R4v + T7y + E2M + Z8v + E5M + J8v + q7v + d7B + i0Z + J8v + q7v + d7B + f0i + x8M + e4M + E4K + E2M + d1K + A1M + a3M + r7M + b43 + A1M + s2M + a58 + h4M + o0v + J8v + J8v + E4K + J8v + F3v + S1v + Z63 + y1M + C8v + a58 + J8v + N6K + B8M + J0M + E4K + e4M + x8M + m8Z + w43 + X93 + s2M + E2M + Q43 + E3v + J8v + Z88 + s2M + f0i + h4M + o0v + J8v + J8v + E4K + J8v + F3v + S1v + Z63 + x8M + h4M + E2M + Z63 + F3v + N2K + D8y + s2M + y1M + m8Z + n0i + J8v + q7v + A1M + s2M + t8y + J8v + p5i + i0Z + J8v + Z88 + s2M + f0i + x8M + e4M + E4K + X2M + J4M + j13 + r93 + i53 + e4v + d5M + b7y + i5y + d5M + E3v + J8v + q7v + A1M + s2M + h2y + J8v + Z88 + s2M + r13 + Z8v + x8M + S7M + r7M + F3v + Z63 + h4M + B8M + j7M + f0i + F3v + E2M + f0i + e4M + L9M + J0M + p93 + J8v + Z88 + s2M + N1Z + J8v + Z88 + s2M + t8y + J8v + p5i + t8y + e4M + Y0y + r13), "floatHR": (p93 + e4M + Y0y + f0i + h4M + f83 + J8v + E4K + J8v + O5K + Z63 + C4M + E38 + Z63 + q7v + i6y + J0M + a58 + J8v + N6K + B8M + J0M + E4K + e4M + e7B + q7v + w43 + p9M + s2M + y5i + J7Z + e4M + Y0y + r13), "crossX": (p93 + e4M + x8M + f7v + f0i + h4M + B8M + A1M + J8v + J8v + E4K + J8v + j2y + R7K + x8i + x8M + Z8v + f0i + J8v + F3v + S1v + q2M + j4Z + a4Z + z3B + s3M + a58 + J8v + F3v + J1v + B8M + J0M + E4K + e4M + x8M + u0K + p9M + s2M + E2M + s2M + J0M + J7Z + e4M + x8M + f7v + r13), "crossY": (p93 + e4M + Y0y + f0i + h4M + B8M + A6i + E4K + J8v + F3v + S1v + q2M + h4M + Z8v + W3M + J4v + x8M + Z8v + f0i + J8v + I7y + h4M + q3K + c8Z + Z8v + q2M + J1v + a58 + J8v + F3v + J1v + K1K + E4K + e4M + x8M + J8v + q7v + B8M + A1M + J1v + p9M + s2M + w08 + J0M + J7Z + e4M + Y0y + r13), "chartControls": (p93 + e4M + x8M + f7v + f0i + h4M + t48 + E4K + J8v + O5K + q2M + h4M + x8i + Z8v + F3v + o1i + E2M + s2M + F3v + B5Z + O7K + a58 + J8v + F3v + J1v + B8M + J0M + E4K + e4M + x8M + J8v + z6i + M9y + p9M + y1M + R6Z + S4M + y1M + E2M + F5K + E2M + X2M + p9M + R3K + K7i + E1K + e4M + Y0y + f0i + x8M + e4M + E4K + h4M + x8i + Z8v + F3v + O33 + x8M + F3K + E3v + J8v + q7v + A1M + s2M + f0i + x8M + e4M + E4K + M4v + S08 + O63 + a58 + h4M + o0v + n3Z + E4K + J8v + F3v + S1v + Z63 + M4v + E2M + E2M + X2M + Z63 + E2M + y3v + F3v + J03 + J8v + q7v + d7B + q5Z + J8v + q7v + d7B + f0i + x8M + e4M + E4K + M4v + E2M + E2M + P73 + a58 + h4M + t48 + E4K + J8v + F3v + S1v + Z63 + M4v + S08 + X2M + Z63 + x8M + s2M + J03 + J8v + p5i + t8y + e4M + Y0y + t8y + e4M + x8M + f7v + r13), "home": (p93 + e4M + x8M + f7v + f0i + x8M + e4M + E4K + r7M + o08 + J0M + a58 + h4M + o0v + J8v + J8v + E4K + J8v + O5K + j08 + y3v + j63 + r7v + A1M + J1v + f0i + r7M + E2M + X2M + J0M + f0i + J8v + F3v + S1v + Z63 + y1M + F3v + s2M + a58 + J8v + F3v + w7K + E4K + e4M + Z1M + J1v + X93 + s2M + E2M + s2M + J0M + E3v + J8v + q7v + d7B + t8y + J8v + p5i + t8y + e4M + x8M + f7v + r13), "floatDate": (p93 + e4M + Y0y + f0i + h4M + o0v + J8v + J8v + E4K + J8v + F3v + S1v + Z63 + C4M + B8M + o5v + Z63 + e4M + f5y + J0M + a58 + J8v + F3v + w7K + E4K + e4M + x8M + u0K + p9M + s2M + E2M + Q43 + J7Z + e4M + x8M + f7v + r13), "handleTemplate": (p93 + e4M + Y0y + f0i + h4M + B8M + M5y + J8v + E4K + J8v + O5K + Z63 + x8M + Y7K + Z63 + r7M + d7B + e4M + K1K + a58 + J8v + L1i + J0M + E4K + e4M + x8M + u0K + p9M + s2M + E2M + Q43 + E1K + J8v + p5i + t8y + J8v + q7v + d7B + t8y + e4M + x8M + f7v + A9v), "iconsTemplate": (p93 + e4M + x8M + f7v + f0i + h4M + B8M + A6i + E4K + J8v + O5K + Z63 + q7v + d7B + J0M + B8M + Z63 + h4M + E2M + Q33 + B5Z + B8M + a58 + J8v + F3v + J1v + B8M + J0M + E4K + e4M + Z1M + J1v + p9M + s2M + E2M + s2M + J0M + E1K + e4M + Y0y + f0i + h4M + B8M + A1M + J8v + J8v + E4K + J8v + F3v + S1v + Z63 + q7v + A1M + Q43 + B8M + Z63 + F3v + x8M + F3v + B8M + J0M + E5M + e4M + Y0y + q5Z + e4M + Y0y + f0i + h4M + B8M + A1M + J8v + J8v + E4K + J8v + F3v + S1v + Z63 + y1M + C8v + f0i + J8v + F3v + S1v + Z63 + x8M + Y7K + E3v + J8v + Z88 + s2M + f0i + h4M + B8M + M5y + J8v + E4K + J8v + O5K + Z63 + x8M + Y7K + Z63 + y3v + q7v + D8y + s2M + y1M + J8v + q7v + n0i + J8v + Z88 + s2M + t8y + e4M + Y0y + q5Z + e4M + Y0y + f0i + h4M + B8M + A1M + J8v + J8v + E4K + J8v + F3v + S1v + Z63 + y1M + F3v + s2M + f0i + J8v + F3v + S1v + Z63 + x8M + h4M + E2M + E3v + J8v + p5i + f0i + h4M + B8M + A6i + E4K + J8v + F3v + S1v + Z63 + x8M + Y7K + Z63 + C4M + p1M + h3K + D8y + s2M + y1M + J8v + q7v + n0i + J8v + q7v + A1M + s2M + t8y + e4M + x8M + f7v + q5Z + e4M + x8M + f7v + f0i + h4M + t48 + E4K + J8v + F3v + S1v + Z63 + y1M + C8v + f0i + J8v + O5K + Z63 + x8M + Y7K + E3v + J8v + Z88 + s2M + f0i + h4M + o0v + n3Z + E4K + J8v + O5K + Z63 + x8M + h4M + E2M + Z63 + e4M + E2M + u7v + s2M + D8y + s2M + y1M + J8v + q7v + n0i + J8v + q7v + A1M + s2M + t8y + e4M + Y0y + q5Z + e4M + x8M + f7v + f0i + h4M + f83 + J8v + E4K + J8v + O5K + Z63 + y1M + C8v + f0i + J8v + F3v + S1v + Z63 + x8M + h4M + E2M + E3v + J8v + Z88 + s2M + f0i + h4M + B8M + M5y + J8v + E4K + J8v + O5K + Z63 + x8M + h4M + E2M + Z63 + h4M + y0v + J0M + D8y + s2M + y1M + m8Z + n0i + J8v + q7v + d7B + t8y + e4M + Y0y + e1i + e4M + Y0y + f0i + h4M + B8M + A6i + E4K + J8v + O5K + Z63 + y1M + C8v + f0i + J8v + F3v + S1v + Z63 + x8M + Y7K + E3v + J8v + q7v + d7B + f0i + h4M + B8M + M5y + J8v + E4K + J8v + O5K + Z63 + x8M + h4M + E2M + Z63 + J0M + t4v + F3v + D8y + s2M + y1M + m8Z + n0i + J8v + q7v + A1M + s2M + t8y + e4M + Y0y + T2v + e4M + x8M + f7v + r13) }
			;
		}
		STXChart.prototype.registerHTMLElements = function () {
			var Y3Z = "modalEnd", T4y = "modalBegin", B1Z = "firstChild", d5Z = "mlCont", c = this[n48][(j1y + B6Z + a6Z + S9y4F.t3y + I4y + G7i + K1y + S9y4F.b3y)]; for (var control in STXChart[(S9y4F.n0Z + S9y4F.t3y + d5Z + S9y4F.b3y + Y33 + S9y4F.a5Z)]) {
				if (typeof this[n48][control] == C53) {
					var el = $$$(v9K + control, c); if (el) { this[n48][control] = el; this[E0y][control] = el; }
					else { var rawHTML = STXChart[l88][control], div = document[i68](c2M); div[x1M] = rawHTML; el = div[B1Z]; c[B73](el); this[n48][control] = el; this[E0y][control] = el; }
				}
			}
			; if (this[E0y][p8Z]) {
				var zoomIn = $$$(x9Z, this[(j1y + B6Z + U0K + U8i + F2v)][p8Z]), zoomOut = $$$(l73, this[E0y][p8Z]); zoomIn[d73] = (function (self) {
					return function (e) { self[T4y](); }
					;
				}
				)(this); zoomIn[c53] = (function (self) {
					return function (e) { self[Y3Z](); }
					;
				}
				)(this); zoomOut[(B6Z + a6Z + l0v + f6v + K1y + B3v + S9y4F.b3y)] = (function (self) {
					return function (e) { self[T4y](); }
					;
				}
				)(this); zoomOut[c53] = (function (self) {
					return function (e) { self[Y3Z](); }
					;
				}
				)(this);
			}
			this[(j1y + B6Z + a6Z + r4Z + B6Z + F2v)][z2v][B2Z] = (function (self) {
				return function (e) { self[z2v](); }
				;
			}
			)(this);
		}
		; STX[y1K] = function (name) {
			var q1K = "epl"; return name[(S9y4F.b3y + q1K + I4y + j1y + K1y)](/-([a-z])/g, function (g) { return g[S9y4F.K3B][s53](); }
			);
		}
		; STXChart.prototype.cloneStyle = function (styleObject) {
			var Q78 = "getPropertyValue", rc = {}
			; for (var i in styleObject) {
				var v = styleObject[i]; if (!isNaN(i)) {
					var x = styleObject[Q78](v); if (x) { rc[STX[y1K](v)] = x; }
				}
				else { rc[STX[y1K](i)] = v; }
			}
			return rc;
		}
		; STXChart.prototype.canvasStyle = function (className) {
			var F5Z = "cloneStyle", s = this[r1v][className]; if (!s) {
				var div = document[i68](m63), styles = getComputedStyle(div); div[L68] = className; document[(Y0i + u4y + q7Z)][B73](div); s = this[r1v][className] = this[F5Z](styles); document[D6i][n9y](div); if (!styles) { this[r1v][className] = S9y4F.o6i; }
			}
			return s;
		}
		; STXChart.prototype.clearStyles = function () {
			this[r1v] = {}
			;
		}
		; STXChart.prototype.setStyle = function (obj, attribute, value) {
			if (!this[r1v][obj]) { this[j2M](obj); }
			if (!this[r1v][obj]) this[r1v][obj] = {}
			; this[r1v][obj][STX[y1K](attribute)] = value;
		}
		; STXChart.prototype.canvasFont = function (className, ctx) {
			var H93 = "bad css style for class ", S5M = "fontFamily", n3M = "fontWeight", r18 = "fontStyle"; if (!ctx) ctx = this[n48][U83]; var style = this[j2M](className); if (!style) return; var result = style[r18] + V2v + style[n3M] + V2v + style[I38] + V2v + style[S5M]; if (result[K0M](C53) == -S9y4F.K3B) { ctx.font = result; }
			else { this[r1v][className] = S9y4F.o6i; console[e48](H93 + className); }
		}
		; STXChart.prototype.canvasColor = function (className, ctx) { var I6M = "opa"; if (!ctx) ctx = this[n48][U83]; var style = this[j2M](className); if (!style) return; var color = style[J2y]; if (STX[g58](color)) color = this[E5K]; ctx.globalAlpha = 1; ctx.fillStyle = color; ctx.strokeStyle = color; var opacity = style[(I6M + j1y + Z2i + q7Z)]; if (typeof opacity != C53) ctx.globalAlpha = opacity; }
		; STXChart.prototype.getCanvasFontSize = function (className) { var J63 = "12", s = this[j2M](className), fs = s[I38]; if (!fs) fs = J63; return parseInt(STX[i1y](fs)); }
		; STXChart.prototype.getCanvasColor = function (className) { var s = this[j2M](className); return s[J2y]; }
		; STXChart[Z0M] = function () { return j8Z; }
		; STXChart.prototype.runPrepend = function (o, args, self) {
			var K6K = "j1F", prepends = this["prepend" + o]; if (!prepends) return false; if (!self) self = this; for (var i = 0; S9y4F[K6K](i, prepends.length) ; i++) { var rv = prepends[i][q38](self, args); if (rv) return rv; }
			return false;
		}
		; STXChart.prototype.runAppend = function (o, args, self) {
			var R8M = "i1", appends = this[(B3B + k5Z + K1y + w8K) + o]; if (!appends) return false; if (!self) self = this; for (var i = 0; S9y4F[(R8M + G0y)](i, appends.length) ; i++) { var rv = appends[i][q38](self, args); if (rv) return rv; }
			return false;
		}
		; STXChart[s9M] = function (name, func) { var v7v = "drawingTools"; STXChart[v7v][name] = func; }
		; STXChart.prototype.createBlock = function (left, width, top, height, className, context) {
			var r3v = "F1F"; if (S9y4F[r3v](context, null)) context = this[n48][U83]; if (typeof (height) == "undefined") { return; }
			this[a0y](className, context); context.fillRect(left, top, width, height); context.globalAlpha = 1;
		}
		; STXChart.prototype.changeOccurred = function (change) { var A0y = "changeCallback"; if (this[k6v]) return; if (this[A0y]) this[A0y](this, change); }
		; STXChart.prototype.setChartType = function (chartType) { var H08 = "A1F"; this[v3Z][c88] = chartType; if (S9y4F[H08](this[n48].canvas, null)) this[c2y](); this[v4y]("layout"); }
		; STXChart.prototype.setAdjusted = function (data) {
			var q7K = "teDa", u5M = "P1F"; this[v3Z][P8v] = data; if (S9y4F[u5M](this[(r28 + q5y + S9y4F.t3y)].canvas, null)) { this[(Z5i + I4y + q7K + S9y4F.t3y + I4y + U3B + j23)](); this[c2y](); }
			this[v4y]((J6Z + D0y + b0v));
		}
		; STXChart.prototype.setVolumeUnderlay = function (data) { var P6v = "h1F"; this[v3Z][y4i] = data; if (S9y4F[P6v](this[n48].canvas, null)) this[c2y](); this[v4y]("layout"); }
		; STXChart.prototype.serializeDrawings = function () {
			var n6Z = "rial", D68 = "t1F", arr = []; for (var i = 0; S9y4F[D68](i, this[L8M].length) ; i++) { arr[e8Z](this[L8M][i][(S9y4F.a5Z + K1y + n6Z + S9y4F.W0Z + E8Z + K1y)]()); }
			return arr;
		}
		; STXChart.prototype.abortDrawings = function () {
			var H78 = "B1F"; for (var i = 0; S9y4F[(H78)](i, this[L8M].length) ; i++) { this[L8M][i].abort(true); }
			this[L8M] = [];
		}
		; STXChart.prototype.reconstructDrawings = function (arr) {
			var z0v = "bje", g18 = "reconstruct", V0y = "ols", w13 = "gT", I2K = "r1F"; for (var i = 0; S9y4F[I2K](i, arr.length) ; i++) {
				var rep = arr[i], Factory = STXChart[(u4y + E6y + S9y4F.W0Z + a6Z + w13 + B6Z + V0y)][rep[s5i]]; if (!Factory) {
					if (STX[N7Z][rep[s5i]]) { Factory = STX[N7Z][rep[s5i]]; STXChart[s9M](rep[s5i], Factory); }
				}
				if (Factory) { var drawing = new Factory; drawing[g18](this, rep); this[(u4y + A0i + K7M + a6Z + A4Z + b5y + z0v + m4Z)][e8Z](drawing); }
			}
		}
		; STXChart.prototype.clearDrawings = function () { this[m6K](); this[n0K](); this[v4y](l68); this[j3K](); this[(c2y)](); }
		; STXChart.prototype.createDrawing = function (type, parameters) { var drawing = new STX[N7Z][type]; drawing[(S9y4F.b3y + K1y + j1y + h73 + O4y + u2i + u08)](this, parameters); this[L8M][e8Z](drawing); this[c2y](); return drawing; }
		; STXChart.prototype.removeDrawing = function (drawing) {
			var N5y = "f1F", h3B = "y1F"; for (var i = 0; S9y4F[h3B](i, this[L8M].length) ; i++) {
				if (S9y4F[N5y](this[L8M][i], drawing)) { this[L8M][j7Z](i, 1); this[v4y]("vector"); this[c2y](); return; }
			}
		}
		; STXChart.prototype.dateFromTick = function (tick, chart) {
			var T58 = "m2F", q48 = "2F", B6v = "N2F", s1i = "LegacyMar", d83 = "Z2F", K43 = "a2F", G18 = "n2F", w2i = "C2F", C3K = "L2F", o63 = "c2F", B0v = "acy", E6Z = "g1F", M53 = "O1F", E8y = "p1F", h9Z = "x1F"; if (!chart) chart = this[n48]; var interval = this[v3Z][l2M], periodicity = this[v3Z][y2Z], l = chart[B6K].length; if (S9y4F[h9Z](tick, l) && S9y4F[E8y](tick, 0)) return chart[B6K][tick][a03]; if (S9y4F[M53](tick, 0)) {
				var dt = chart[(u4y + L1y + U3B + K1y + S9y4F.t3y)][0][(g9y + l3B)]; for (var i = 0; S9y4F[E6Z](i, 3000) ; i++) { if (-i == tick) return STX[B4v](dt); if (!this[E5Z](interval)) dt = STX[(S9y4F.N9y + K1y + A4Z + B0v + H3v + S9y4F.b3y + X68)][t0v](dt, interval, periodicity, this); else if (S9y4F[o63](interval, "day")) dt = STX[p6v][K9v](dt, periodicity, this); else if (S9y4F[C3K](interval, "week")) dt = STX[p6v][T5M](dt, periodicity, this); else if (S9y4F[w2i](interval, "month")) dt = STX[p6v][X6M](dt, periodicity, this); }
			}
			else {
				var dt = chart[B6K][S9y4F[G18](l, 1)][U3M]; for (var i = 0; S9y4F[K43](i, 3000) ; i++) {
					if (S9y4F[d83](l - 1 + i, tick)) { return STX[B4v](dt); }
					if (!this[E5Z](interval)) dt = STX[(s1i + d9Z + K1y + S9y4F.t3y)][Q3v](dt, interval, periodicity, this); else if (S9y4F[B6v](interval, "day")) dt = STX[p6v][O9M](dt, periodicity, this); else if (S9y4F[(r7B + q48)](interval, "week")) dt = STX[p6v][v3K](dt, periodicity, this); else if (S9y4F[T58](interval, (Y9Z + S0v + S9y4F.n0Z))) dt = STX[p6v][Y0Z](dt, periodicity, this);
				}
			}
			return STX[B4v](dt);
		}
		; STXChart.prototype.futureTick = function (mydt, chart) {
			var l28 = "U8F", w4i = "m8F", w23 = "getTi", S7v = "Q8F", y08 = "Week", g38 = "N8F", B48 = "Day", H4i = "Z8F", c4i = "Mark", b0i = "Lega", d5i = "H8F", F48 = "Y8F", f8Z = "q8F", y18 = "o2F", O6v = "our", D6v = "nH", q8v = "u2F", m8M = "v2F", Q6M = "d2F", I2i = "rv", j3B = "lyInte", F0M = "sDai", J9M = "W2F", H3y = "I2F", C9K = "w2F", b9y = "U2F", q18 = "ToDate", R78 = "str", mym = STX[(R78 + q18 + l3B + R8i + K1y)](mydt)[u68](), interval = this[v3Z][l2M], periodicity = this[v3Z][y2Z], dt = chart[B6K][S9y4F[b9y](chart[B6K].length, 1)][U3M], m = dt[u68](), ticks = 0, computedPeriodicity = periodicity; if (!this[E5Z](interval)) { if (S9y4F[C9K](interval, (Y9Z + S9y4F.W0Z + a6Z + h0y))) computedPeriodicity = S9y4F[H3y](periodicity, interval); }
			for (var i = 0; S9y4F[J9M](i, 1500) ; i++) {
				if (!this[(S9y4F.W0Z + F0M + j3B + I2i + I4y + J6Z)](interval)) {
					if (S9y4F[Q6M](dt[J3v](), chart[E9Z]) && S9y4F[(K1y + S9y4F.l5K + G0y)](dt[O5Z](), chart[E8K])) {
						if (S9y4F[m8M]((mym - m) / 60000, chart[g0v])) {
							dt = STX[p6v][O9M](dt, 1, this); if (S9y4F[q8v](chart[(Q4y + K1y + A4Z + S9y4F.W0Z + D6v + O6v)], 0) && S9y4F[y18](dt[(A4Z + K1y + S9y4F.t3y + g9y + I4y + q7Z)](), 0)) { dt[m7v](15); dt[R0i](0); }
							if (S9y4F[f8Z](chart[E9Z], 0) && S9y4F[F48](dt[(o53 + S9y4F.t3y + D08 + q7Z)](), 1)) { ticks += Math[E08](S9y4F[d5i](9, 60, computedPeriodicity)); }
							else { ticks += Math[E08](S9y4F[(T6v + G0y)](chart[g0v], computedPeriodicity)); }
						}
						else { dt = STX[(b0i + j1y + q7Z + c4i + j23)][Q3v](dt, interval, periodicity, this); ticks += 1; }
					}
					else { dt = STX[p6v][Q3v](dt, interval, periodicity, this); ticks += 1; }
				}
				else { ticks += 1; if (S9y4F[H4i](interval, (e3M + q7Z))) dt = STX[p6v][(a6Z + K1y + P7Z + S9y4F.t3y + B48)](dt, periodicity, this); else if (S9y4F[g38](interval, "week")) dt = STX[p6v][(a6Z + K1y + P7Z + S9y4F.t3y + y08)](dt, periodicity, this); else if (S9y4F[S7v](interval, "month")) dt = STX[p6v][Y0Z](dt, periodicity, this); }
				m = dt[(w23 + v5v)](); if (S9y4F[w4i](m, mym)) { return chart[B6K].length + ticks; }
				if (S9y4F[l28](mym, m)) { return chart[B6K].length + ticks - 1; }
			}
			return chart[B6K].length + ticks;
		}
		; STXChart.prototype.pastTick = function (mydt, chart) {
			var M0y = "w7F", x2i = "U7F", x18 = "m7F", N7K = "Q7F", Q68 = "N7F", I7Z = "Pe", e6y = "Z7F", A5K = 210, l33 = "a7F", s8i = "isHalfDay", M6v = "n7F", g8K = "C7F", t5Z = "q7F", D13 = "u8F", e3v = "v8F", X9K = "nu", I58 = "beg", y3y = "e8F", f9y = "d8F", s63 = "val", a48 = "ily", X2K = "W8", p88 = "I8F", T78 = "w8F", mym = STX[M3M](mydt)[u68](), interval = this[v3Z][l2M], periodicity = this[v3Z][y2Z], dt = chart[B6K][S9y4F.Y3B][U3M], m = dt[u68](), ticks = S9y4F.Y3B, computedPeriodicity = periodicity; if (!this[E5Z](interval)) { if (S9y4F[T78](interval, h9i)) computedPeriodicity = S9y4F[p88](periodicity, interval); }
			for (var i = S9y4F.Y3B; S9y4F[(X2K + G0y)](i, H0K) ; i++) {
				if (!this[(V2i + D08 + a48 + X6y + a6Z + S9y4F.t3y + I13 + s63)](interval)) {
					if (S9y4F[f9y](dt[J3v](), chart[E9Z]) && S9y4F[y3y](dt[O5Z](), chart[(I58 + G7i + G5y + S9y4F.W0Z + X9K + f3y)])) {
						var dt2 = STX[p6v][K9v](dt, S9y4F.K3B, this); if (S9y4F[e3v]((dt2[u68]() - mym) / t9M, chart[g0v])) {
							dt = dt2; if (S9y4F[D13](chart[E9Z], S9y4F.Y3B)) {
								if (S9y4F[(W2K + G0y)](dt[H8y](), S9y4F.Y3B)) { ticks += Math[E08](S9y4F[(t5Z)](S3B, T2Z, computedPeriodicity)); }
								else { ticks += Math[E08](S9y4F[g8K](chart[g0v], computedPeriodicity)); }
							}
							else if (S9y4F[M6v](chart[E9Z], S3B) && STX[(S9y4F.N9y + K1y + A4Z + I4y + S3Z + q5y + d9Z + K1y + S9y4F.t3y)][s8i](dt, chart[e5K])) { ticks += Math[E08](S9y4F[l33](A5K, computedPeriodicity)); }
							else { ticks += Math[E08](S9y4F[e6y](chart[g0v], computedPeriodicity)); }
						}
						else { dt = STX[p6v][t0v](dt, interval, periodicity, this); ticks += S9y4F.K3B; }
					}
					else { dt = STX[p6v][(T7M + K1y + S9y4F.u7Z + I7Z + S9y4F.b3y + F8i + u4y)](dt, interval, periodicity, this); ticks += S9y4F.K3B; }
				}
				else { ticks += S9y4F.K3B; }
				if (S9y4F[Q68](interval, D93)) dt = STX[p6v][K9v](dt, periodicity, this); else if (S9y4F[N7K](interval, X83)) dt = STX[p6v][T5M](dt, periodicity, this); else if (S9y4F[x18](interval, r3M)) dt = STX[p6v][X6M](dt, periodicity, this); m = dt[u68](); if (S9y4F[x2i](m, mym)) { return -ticks; }
				if (S9y4F[M0y](mym, m)) { return -(ticks + S9y4F.K3B); }
			}
			return -ticks;
		}
		; STXChart.prototype.calculateYAxisMargins = function (yAxis) { var y2M = "I7F"; yAxis[f08] = yAxis[B9v] + yAxis[m4v]; yAxis[i2v] = S9y4F[y2M]((yAxis[B9v] - yAxis[m4v]), S9y4F.V3B); }
		; STXChart.prototype.home = function () {
			var X0i = "cro", e83 = "Se", g2M = "W7F"; if (this[G5Z]("home", arguments)) return; this[s0M] = true; if (!this[n48][B6K] || S9y4F[g2M](this[n48][(u4y + I4y + P7y + e83 + S9y4F.t3y)].length, 0)) return; for (var chartName in this[M18]) { var chart = this[M18][chartName]; chart[(S9y4F.a5Z + X0i + v6Z)] = Math[d5y](chart[H58], chart[(e3M + S9y4F.t3y + I4y + e83 + S9y4F.t3y)].length); this[g9K](chart[v73][n5K]); }
			this[c2y](); this[P9i]((z2v), arguments);
		}
		; STXChart.prototype.tickFromDate = function (dt, chart) {
			var G6v = "H3F", s5M = "q3F", q6y = "pastTick", v2K = "o7", c9v = "futureTick", O4i = "u7F", s93 = "get", j5v = "v7F", J28 = "e7F", G0Z = "d7F"; if (!chart) chart = this[n48]; var DT = STX[M3M](dt); if (S9y4F[G0Z](chart[E9Z], 0) && !STXChart[E5Z](this[v3Z][l2M])) {
				if (S9y4F[J28](DT[J3v](), 0)) { DT[m7v](chart[E9Z]); DT[R0i](chart[E8K]); }
			}
			var mym = DT[u68](), m = chart[(v63 + I4y + U3B + K1y + S9y4F.t3y)][S9y4F[j5v](chart[B6K].length, 1)][U3M][(s93 + l3B + S9y4F.W0Z + v5v)](); if (S9y4F[O4i](m, mym)) return this[c9v](dt, chart); var first = chart[B6K][0][U3M][u68](); if (S9y4F[(v2K + G0y)](mym, first)) return this[q6y](dt, chart); for (var i = S9y4F[s5M](chart[B6K].length, 1) ; S9y4F[(Q8y + U0i)](i, 0) ; i--) { m = chart[B6K][i][U3M][u68](); if (S9y4F[G6v](m, mym)) return i; }
		}
		; STXChart.prototype.timeShiftDate = function (dt) { var Q0K = "G3F", ms = dt[u68](); ms += S9y4F[Q0K](this[Q8K], t9M); return new Date(ms); }
		; STXChart.prototype.createXAxis = function (chart) {
			var K5i = "i9X", L5K = "monthAsDisplay", u2K = "j9X", g1v = "V9X", o5y = "R6X", q6i = "l6X", R13 = "b6X", R8Z = "E6X", T73 = "s6X", e5y = "J6X", A73 = "k6X", H73 = "D6X", g9i = "M6X", x7Z = "X6X", e13 = "z6X", u5i = "S6X", w28 = "G6X", D9K = "timeAsDisplay", R1Z = "H6X", i6i = "Y6X", s8K = "6X", r4M = "beginDay", q5v = "etDat", p4y = "iona", l1i = "ry", X28 = "u5X", O4v = "llY", r6y = "Fu", G4Z = "v5X", n3v = "d5X", A03 = "tMi", k4Z = "W5X", g68 = "Ho", D1K = "I5X", V2Z = "w5X", N43 = "U5X", c58 = "tDay", h8v = "m5X", T9i = "xaxisFactor", l9Z = "Q5X", i2M = "xT", h2M = "N5X", l5Z = "Z5X", i23 = "a5X", Y1K = "n5X", M6y = "C5X", B3Z = "prettyXaxis", S7i = "q5X", n4i = "o3F", L8K = "b3F", K5Z = "s3F", Z4y = "tM", r4K = "timeShiftDate", J83 = "J3F", v7B = "k3F", z68 = "T3F", M1K = "M3F", S3y = "z3F", R2v = "riodic", s13 = "S3F"; if (S9y4F[s13](chart[(u4y + o1y + V73 + a53 + S9y4F.t3y)].length, 0)) return null; var axisRepresentation = this[G5Z]("createXAxis", arguments); if (axisRepresentation) return axisRepresentation; var displayLetters = false, interval = this[v3Z][l2M], periodicity = this[v3Z][(V5M + R2v + S9y4F.W0Z + U2Z)], candleWidth = this[v3Z][C9i], p = periodicity, isIntraday = false, isDaily = false, isWeekly = false, isMonthly = false; if (S9y4F[S3y](interval, "week")) { isWeekly = true; p = S9y4F[(e7y + S9y4F.z6K + G0y)](5, p); }
			if (S9y4F[M1K](interval, "month")) { isMonthly = true; p = S9y4F[(g9y + U0i)](20, p); }
			if (S9y4F[z68](candleWidth * (20 / p), 50)) displayLetters = true; var i = 0; chart[g4y] = []; for (; S9y4F[v7B](i, chart[H58]) ; i++) { if (S9y4F[J83](chart[q3B][i], null)) break; chart[(P7Z + i9y + V2i)][e8Z](null); }
			var dt; if (chart[q3B][i]) { dt = chart[q3B][i][U3M]; }
			else { dt = new Date(); }
			var currentDate = dt[(A4Z + j23 + g9y + I4y + f3y)](); if (is24) currentDate = this[r4K](dt)[c7K](); var prevMonth = dt[(A4Z + K1y + Z4y + h73 + Q6Z)](), prevYear = dt[n4v](), currentDay = null, ticksPerDay = 1, is24 = (S9y4F[K5Z](chart[g0v], 1440)); if (!this[E5Z](interval)) { isIntraday = true; if (S9y4F[(d9y + U0i)](interval, "minute")) interval = 1; ticksPerDay = Math[S1Z](S9y4F[L8K](chart[g0v], periodicity, interval)); }
			else { isDaily = true; }
			var ticksPerClick = Math[(y7B + a6Z + u4y)](S9y4F[(B3y + S9y4F.z6K + G0y)](ticksPerDay, Math[S1Z](ticksPerDay / Math[(q4Z + J6Z + B6Z + B6Z + S9y4F.b3y)](100 / candleWidth)))); if (S9y4F[n4i](ticksPerClick, 1)) ticksPerClick = 1; var minuteBoundary = S9y4F[S7i](ticksPerClick, periodicity, interval); if (chart[B3Z]) {
				var mod = chart[B3Z][S9y4F[M6y](periodicity, interval)]; if (!mod) mod = 1; if (S9y4F[Y1K](minuteBoundary, mod)) { minuteBoundary = S9y4F[i23](Math[z0Z]((minuteBoundary + mod) / mod), mod); }
			}
			var offset = Math[E08](S9y4F[l5Z](Math[E08](candleWidth * this[n8K]) / 2, 1)), fontHeight = this[X88]("stx_xaxis"), bottom = chart[v73][C2Z]; axisRepresentation = []; for (i; S9y4F[(h2M)](i, chart[(i8v + i2M + S9y4F.W0Z + j1y + d9Z + S9y4F.a5Z)]) ; i++) {
				if (!isMonthly && S9y4F[l9Z](chart[H58] / ticksPerDay, (this[(j1y + i2i + S9y4F.t3y)].width / this[n48][T9i]))) {
					var prices; if (S9y4F[h8v](i, chart[q3B].length)) {
						prices = chart[q3B][i]; dt = prices[U3M]; if (prices[u1K]) { dtShifted = prices[u1K]; }
						else { dtShifted = this[r4K](dt); }
					}
					else { if (isIntraday) dt = STX[p6v][Q3v](dt, interval, periodicity, this); else if (isWeekly) dt = STX[p6v][v3K](dt, periodicity, this); else if (isMonthly) dt = STX[p6v][Y0Z](dt, periodicity, this); else if (isDaily) dt = STX[(S9y4F.N9y + K1y + A4Z + I4y + j1y + q7Z + G5y + q5y + X68)][(a6Z + d93 + c58)](dt, periodicity, this); dtShifted = this[r4K](dt); }
					var isNextDate = S9y4F[N43](dt[(A4Z + j23 + g9y + H2y)](), currentDate); if (is24) isNextDate = S9y4F[V2Z](dtShifted[c7K](), currentDate); var nonBoundary = S9y4F[D1K](dt[J3v](), chart[(h2i + S8M + a6Z + g68 + a9v)]) || S9y4F[k4Z](dt[(o53 + A03 + a6Z + B3y + f3y + S9y4F.a5Z)](), chart[E8K]); if (is24) nonBoundary = S9y4F[n3v](dtShifted[J3v](), 0) || S9y4F[(K1y + b8K + e7y)](dtShifted[O5Z](), 0); if (isNextDate) {
						var gridType = "boundary"; if (!isIntraday) gridType = "line"; currentDate = dt[c7K](); if (is24) currentDate = dtShifted[c7K](); var hz = S9y4F[G4Z](((i) * candleWidth), 3), text = ""; if (!STXChart[Z0M]()) {
							var y = dt[(o53 + S9y4F.t3y + r6y + O4v + K1y + q5y)](); if (S9y4F[X28](y, prevYear)) { prevYear = y; text = y; gridType = (Q4y + B6Z + n0v + e3M + l1i); }
							else {
								if (this[p4M]) { text = this[(M8K + I13 + a6Z + w5y + p4y + J6Z + S9y4F.W0Z + E8Z + K1y + S9y4F.b3y)][m1K][i88](dtShifted); }
								else { text = (dtShifted[j0i]() + 1) + "/" + dtShifted[(A4Z + q5v + K1y)](); }
							}
						}
						axisRepresentation[e8Z]({ hz: hz, grid: gridType, text: text }
						);
					}
					else if (nonBoundary) {
						var minutes = (S9y4F[(B6Z + b8K + e7y)](dt[J3v](), 60) + dt[O5Z]() - STX[p6v][r4M](dt, this)); if (is24) minutes = S9y4F[(g5Z + s8K)](dtShifted[J3v](), 60) + dtShifted[O5Z](); if (S9y4F[i6i](minutes % minuteBoundary, 0)) {
							var hz = (S9y4F[R1Z](i, candleWidth)) + offset, text = ""; if (!STXChart[Z0M]()) text = STX[D9K](dtShifted, this); axisRepresentation[e8Z]({ hz: hz, grid: "line", text: text }
							);
						}
					}
				}
				else {
					var prices; if (S9y4F[w28](i, chart[q3B].length)) { prices = chart[q3B][i]; dt = prices[U3M]; }
					else { if (isIntraday) dt = STX[p6v][Q3v](dt, interval, periodicity, this); else if (isWeekly) dt = STX[p6v][v3K](dt, periodicity, this); else if (isMonthly) dt = STX[p6v][Y0Z](dt, periodicity, this); else if (isDaily) dt = STX[p6v][O9M](dt, periodicity, this); }
					dtShifted = dt; var m = dt[j0i](), y = dt[n4v](); if (S9y4F[u5i](y, prevYear)) {
						prevYear = y; prevMonth = m; var hz = S9y4F[e13]((i * candleWidth), 2), text = ""; if (!STXChart[Z0M]()) text = y; axisRepresentation[e8Z]({ hz: hz, grid: "boundary", text: text }
						);
					}
					else if (S9y4F[x7Z](m, prevMonth)) {
						var doIt = "monthly"; if (isWeekly && S9y4F[g9i](chart[H58] * periodicity, (52 * 1))) doIt = "quarterly"; else if (isMonthly && S9y4F[H73](chart[H58] * periodicity, (12 * 1))) doIt = "quarterly"; else if (isDaily && S9y4F[(l3B + r8K + e7y)](chart[H58] * periodicity, (365 * 1))) doIt = "quarterly"; if (isWeekly && S9y4F[A73](chart[H58] * periodicity, (52 * 2))) doIt = (a6Z + B6Z + a6Z + K1y); else if (isMonthly && S9y4F[e5y](chart[H58] * periodicity, (12 * 2))) doIt = "none"; else if (isDaily && S9y4F[T73](chart[H58] * periodicity, (365 * 2))) doIt = "none"; if (S9y4F[R8Z](doIt, (l0v + a6Z + Q6Z + J6Z + q7Z)) || (S9y4F[R13](doIt, "quarterly") && (S9y4F[q6i](m, 0) || S9y4F[o5y](m, 3) || S9y4F[g1v](m, 6) || S9y4F[(c9y + L3K + e7y)](m, 9)))) {
							prevMonth = m; var hz = S9y4F[u2K]((i * candleWidth), 2), text = ""; if (!STXChart[Z0M]()) text = STX[L5K](m, displayLetters, this); axisRepresentation[e8Z]({ hz: hz, grid: "line", text: text }
							);
						}
					}
				}
				var obj = { DT: dtShifted, Date: STX[B4v](dtShifted) }
				; if (S9y4F[K5i](i, chart[q3B].length)) obj.data = chart[q3B][i]; else obj.data = null; chart[g4y][e8Z](obj);
			}
			this[P9i]("createXAxis", arguments); return axisRepresentation;
		}
		; STXChart.prototype.drawXAxis = function (chart, axisRepresentation) {
			var T1v = "L0X", M3Z = "c0X", x7B = "g9X", T43 = "O9X", z9y = "p9X", S2v = "x9X", m1Z = "f9X", q0i = "y9X", f3v = "r9X", q1y = "B9X", C28 = "t9X", g4K = "h9X", x13 = "Styl", Z3M = "nvas", k7B = "x_g", S23 = "P9X", p03 = "A9X", I48 = "hz", l9K = "F9X"; if (this[G5Z]("drawXAxis", arguments)) return; if (!axisRepresentation) return; var priorBoundary = null, context = this[n48][U83]; this[l4M]("stx_xaxis"); context.textAlign = "center"; context.textBaseline = "middle"; for (var i = 0; S9y4F[l9K](i, axisRepresentation.length) ; i++) { var obj = axisRepresentation[i], w = context.measureText(obj[J78]).width; obj[I48] = obj[I48] + .5; obj[K1Z] = S9y4F[p03](obj[I48], (w / 2)); obj[L0Z] = obj[I48] + (S9y4F[S23](w, 2)); }
			var plotter = new STX[Z83](); plotter[m9Z]("line", "stroke", this[j2M]((S9y4F.a5Z + S9y4F.t3y + k7B + S9y4F.b3y + S9y4F.W0Z + u4y))); plotter[m9Z]("boundary", "stroke", this[(z88 + Z3M + x13 + K1y)]("stx_grid_dark")); var bottom = chart[v73][C2Z], middle = S9y4F[g4K](bottom, this[g6v] / 2), yAxis = chart[v73][n5K], context = this[n48][U83], prevRight = -1, nextBoundaryLeft = 1000000000; for (var nb = 0; S9y4F[C28](nb, axisRepresentation.length) ; nb++) {
				if (S9y4F[q1y](axisRepresentation[nb][N4M], "boundary")) { nextBoundaryLeft = axisRepresentation[nb][K1Z]; break; }
			}
			for (var i = 0; S9y4F[f3v](i, axisRepresentation.length) ; i++) {
				var obj = axisRepresentation[i]; if (S9y4F[q0i](i, nb)) {
					for (nb++; S9y4F[m1Z](nb, axisRepresentation.length) ; nb++) {
						if (S9y4F[S2v](axisRepresentation[nb][N4M], "boundary")) { nextBoundaryLeft = axisRepresentation[nb][K1Z]; break; }
					}
					if (S9y4F[z9y](nb, axisRepresentation.length)) { nb = -1; nextBoundaryLeft = 1000000000; }
					if (prevRight > -1) { if (S9y4F[T43](obj[K1Z], prevRight)) continue; }
				}
				else {
					if (prevRight > -1) { if (S9y4F[x7B](obj[K1Z], prevRight)) continue; }
					if (S9y4F[M3Z](obj[L0Z], nextBoundaryLeft)) continue;
				}
				prevRight = obj[L0Z]; plotter.moveTo(obj[N4M], obj[I48], yAxis.top); plotter.lineTo(obj[N4M], obj[(S9y4F.n0Z + E8Z)], yAxis[C2Z]); this[a0y](S9y4F[T1v](obj[(A4Z + e5i + u4y)], "boundary") ? "stx_xaxis_dark" : "stx_xaxis"); context.fillText(obj[J78], obj[I48], middle);
			}
			plotter[c2y](context); context.textAlign = (J6Z + j83 + S9y4F.t3y); this[P9i]("drawXAxis", arguments);
		}
		; var cached = S9y4F.Y3B, notcached = S9y4F.Y3B; STXChart.prototype.createYAxis = function (panel, parameters) {
			var g5i = "printDecimalPlaces", e93 = "X1X", I3K = "z1X", k5K = "S1X", a5v = "G1X", I0M = "H1X", d0y = "Y1X", t23 = "LN", s6v = "q1X", O7y = "o4X", R3y = "u4X", Y4y = "v4X", r23 = "e4X", w5K = "d4X", P48 = "nim", z0i = "minimumPriceTick", U4y = "W4X", C4K = "I4X", P4v = "w4X", L1M = "U4X", G9M = "eT", J7K = "m4X", A8i = "Q4X", q63 = "N4X", k5v = "Z4X", A7i = "a4X", Z73 = "n4X", b6Z = "C4X", R3M = "L4X", z08 = "ckS", N18 = "ealTi", q58 = "c4X", F9K = "idealTickSizePixels", R5Z = "g0X", k1i = "O0X", A9K = "p0X", W7y = "x0X", n2Z = "f0X", P38 = "y0X", L4y = "w0X", i2Z = "U0X", r9i = "m0X", m53 = "Q0X", K2y = "N0X", K3M = "cac", Z58 = "Z0X", a38 = "a0X", s7y = "n0X", l8y = "enableCaching", u6M = "C0X"; if (this[G5Z]("createYAxis", arguments)) return; var chart = panel[(r63 + K2i)], isAChart = (S9y4F[u6M](panel[s5i], chart[s5i])), yAxis = panel[n5K]; if (!parameters) parameters = {}
			; parameters[h2K] = false; if (STXChart[l8y] && S9y4F[s7y](yAxis[(S9y4F.n0Z + S9y4F.W0Z + h63)], panel[p3Z]) && S9y4F[a38](yAxis[W58], panel[f2K])) { var leftTick = S9y4F[Z58](chart[B6K].length, chart[(S9y4F.a5Z + j1y + U8i + J6Z + J6Z)]), rightTick = leftTick + chart[H58]; panel[(K3M + S9y4F.n0Z + K1y + S9y4F.N9y + K1y + q4Z + S9y4F.t3y)] = Math[d5y](panel[Y38], leftTick); panel[c7i] = Math[L8y](panel[c7i], rightTick); panel[Y38] = leftTick; panel[c7i] = rightTick; parameters[h2K] = true; cached++; }
			else { panel[Y38] = 1000000; panel[c7i] = -1; panel[p3Z] = yAxis[V58]; panel[f2K] = yAxis[W58]; notcached++; }
			if (!parameters[h2K]) {
				var height = yAxis.height = S9y4F[K2y](yAxis[C2Z], yAxis.top), pricePerPix = S9y4F[m53]((yAxis[V58] - yAxis[W58]), (height - yAxis[(E8Z + n73 + Y9Z)])); yAxis[V58] = yAxis[V58] + S9y4F[r9i]((yAxis[f08] / 2), pricePerPix) + S9y4F[i2Z](yAxis[i2v], pricePerPix); yAxis[W58] = S9y4F[L4y](yAxis[W58], (yAxis[(g28 + E73)] / 2) * pricePerPix, yAxis[i2v] * pricePerPix); yAxis[O3B] = S9y4F[P38](yAxis[(S9y4F.n0Z + s58 + S9y4F.n0Z)], yAxis[W58]); if (yAxis[x4i] && (!this[g23] || S9y4F[n2Z](this[g23][s5i], "projection"))) { yAxis[l98] = S9y4F[W7y](Math[e48](yAxis[V58]), Math[c0i]); yAxis[R5v] = S9y4F[A9K](Math[e48](yAxis[W58]), Math[c0i]); if (S9y4F[k1i](yAxis[W58], 0)) yAxis[R5v] = 0; yAxis[O5v] = S9y4F[R5Z](yAxis[l98], yAxis[R5v]); }
				if (!yAxis[F9K]) {
					var fontHeight = this[X88]("stx_yaxis"); if (isAChart) { yAxis[F9K] = S9y4F[q58](fontHeight, 4); }
					else { yAxis[(S9y4F.W0Z + u4y + N18 + z08 + S9y4F.W0Z + L0i + E6K + K1y + F2v)] = S9y4F[R3M](fontHeight, 1.5); }
				}
				var idealTicks = Math[E08](S9y4F[b6Z](height, yAxis[F9K])); yAxis[C1v] = Math[z0Z](S9y4F[Z73](yAxis[O3B], idealTicks)); if (S9y4F[A7i](yAxis[C1v], 0)) {
					yAxis[C1v] = S9y4F[k5v](Math[z0Z](yAxis[O3B] / idealTicks * 10), 10); if (S9y4F[q63](yAxis[C1v], 0)) {
						yAxis[C1v] = S9y4F[A8i](Math[z0Z](yAxis[O3B] / idealTicks * 100), 100); if (S9y4F[J7K](yAxis[(k5Z + S9y4F.b3y + S9y4F.W0Z + j1y + G9M + j98 + d9Z)], 0)) {
							yAxis[C1v] = S9y4F[L1M](Math[(L9v + S9y4F.b3y)](yAxis[O3B] / idealTicks * 1000), 1000); if (S9y4F[P4v](yAxis[(V08 + j1y + w3v + b18)], 0)) { yAxis[C1v] = S9y4F[C4K](Math[z0Z](yAxis[O3B] / idealTicks * 10000), 10000); if (S9y4F[U4y](yAxis[C1v], 0)) yAxis[C1v] = .0001; }
						}
					}
				}
				if (yAxis[z0i]) {
					yAxis[C1v] = yAxis[(Y9Z + S9y4F.W0Z + P48 + k0v + F6y + e5i + F28 + l3B + j98 + d9Z)]; for (var i = 0; S9y4F[w5K](i, 10) ; i++) { var numberOfTicks = S9y4F[r23](yAxis[O3B], yAxis[C1v]); if (S9y4F[Y4y](height / numberOfTicks, this[X88]("stx_yaxis") * 2)) yAxis[C1v] *= 2; else break; }
				}
				yAxis[S4y] = S9y4F[R3y](yAxis.height, yAxis[O3B]);
			}
			if (!this[g23] || S9y4F[O7y](this[g23][s5i], "projection")) {
				yAxis[V58] = this[X5M](panel.top, panel); if (yAxis[x4i]) { yAxis[l98] = S9y4F[s6v](Math[e48](yAxis[V58]), Math[(t23 + u6K + y6K)]); yAxis[R5v] = S9y4F[d0y](Math[e48](yAxis[W58]), Math[c0i]); if (S9y4F[I0M](yAxis[(J6Z + E13)], 0)) yAxis[R5v] = 0; yAxis[O5v] = S9y4F[a5v](yAxis[l98], yAxis[R5v]); }
				yAxis[O3B] = S9y4F[k5K](yAxis[V58], yAxis[W58]);
			}
			yAxis[S4y] = S9y4F[I3K](yAxis.height, yAxis[(t9y + W2y + B6Z + k7Z)]); if (S9y4F[e93](yAxis[z1Z], null)) { yAxis[g5i] = chart[z1Z]; }
			else { yAxis[g5i] = yAxis[z1Z]; }
			if (this[P9i]("createYAxis", arguments)) return;
		}
		; STXChart.prototype.drawYAxis = function (panel, parameters) {
			var f3K = "plotYAxisText", W6K = "xisG", p58 = "lot", r9M = "o1X", E18 = "addText", v3B = "Fo", V6Z = "lotter", D8i = "sP", k93 = "displayGridLines", c6M = "l1X", O13 = "b1X", d8M = "po", C88 = "E1", S88 = "s1", f38 = "J1X", X08 = "fill", v13 = "stx_grid", m1y = "tro", l7K = "k1X", G58 = "tom", O0i = "T1X", A3y = "D1X", A3v = "M1X", z2K = "noDraw"; if (this[G5Z](Q28, arguments)) return; if (!parameters[z2K]) {
				if (!panel[P98] || !parameters[h2K]) {
					var chart = panel[n48], isAChart = (S9y4F[A3v](panel[s5i], chart[s5i])), yAxis = panel[n5K], verticalTicks = S9y4F[A3y](yAxis[O3B], yAxis[C1v]); if (isAChart) verticalTicks = Math[E08](verticalTicks + Q1y); verticalTicks = Math[E08](verticalTicks); if (yAxis[x4i]) { var logStart = S9y4F[O0i](Math[(u0Z + A4Z)](this[X5M](yAxis[(Y0i + S9y4F.t3y + G58)], panel)), Math[c0i]), logPriceTick = S9y4F[l7K]((yAxis[l98] - yAxis[R5v]), verticalTicks); }
					panel[P98] = new STX[Z83](); panel[P98][m9Z](N4M, (S9y4F.a5Z + m1y + d9Z + K1y), this[j2M](v13)); panel[P98][m9Z](J78, X08, this[j2M](m5y)); var priceOffset = S9y4F.Y3B; if (isAChart) priceOffset = S9y4F[f38](yAxis[(k5Z + S9y4F.b3y + j98 + w3v + j1y + d9Z)], Math[E08]((yAxis[W58] % yAxis[C1v]) * panel[n48][(S9y4F.b3y + M23 + a6Z + G7M + S9y4F.t3y)]) / panel[n48][X3K]); var fontHeight = this[X88](m5y); for (var i = S9y4F.Y3B; S9y4F[(S88 + e7y)](i, verticalTicks) ; i++) {
						var price; if (yAxis[(S9y4F.a5Z + I43 + a88 + a63)]) { var logPrice = logStart + (S9y4F[(C88 + e7y)](i, logPriceTick)); price = Math[(d8M + k7Z)](W1Z, logPrice); }
						else { if (isAChart) price = yAxis[W58] + S9y4F[O13](i, yAxis[C1v]) + priceOffset; else price = S9y4F[c6M](yAxis[V58], (i * yAxis[C1v]), priceOffset); }
						var y = this[o4K](price, panel), y2 = Math[E08](y) + N0Z; if (yAxis[k93]) { panel[(q7Z + S9y4F.E2K + d33 + D8i + V6Z)].moveTo("grid", 0, y2); panel[P98].lineTo("grid", this[n48].width, y2); }
						if (yAxis[(k5Z + S9y4F.b3y + S9y4F.W0Z + F28 + v3B + M38 + w5y + L5i)]) { price = yAxis[o73](this, panel, price); }
						else { price = this[Y2v](price, panel); }
						panel[P98][E18](J78, price, S9y4F[r9M](this[n48][e5Z], this[Z9K]), y);
					}
				}
				this[(k5Z + p58 + Q8y + S9y4F.E2K + W6K + S9y4F.b3y + D58)](panel); this[f3K](panel);
			}
			if (this[P9i](Q28, arguments)) return;
		}
		; STXChart.prototype.plotYAxisGrid = function (panel) { var O4K = "plotYAxisGrid"; if (this[G5Z](O4K, arguments)) return; var context = this[(r28 + q5y + S9y4F.t3y)][U83]; panel[P98][c2y](context, N4M); if (this[P9i](O4K, arguments)) return; }
		; STXChart.prototype.plotYAxisText = function (panel) { var d5K = "YAx", j0v = "axis", Q2i = "sT", b1y = "tY"; if (this[G5Z]((k5Z + u0Z + b1y + S9y4F.E2K + d33 + Q2i + K1y + P7Z + S9y4F.t3y), arguments)) return; this[l4M]((S9y4F.a5Z + F2Z + r2y + q7Z + j0v)); this[a0y](m5y); var context = this[n48][U83]; context.textBaseline = "middle"; panel[P98][c2y](context, J78); context.textBaseline = "alphabetic"; if (this[P9i]((k5Z + u0Z + S9y4F.t3y + d5K + S9y4F.W0Z + Q2i + M3v), arguments)) return; }
		; STXChart.prototype.formatYAxisPrice = function (price, panel) {
			var s2y = "z2X", p68 = "S2", z7v = "G2X", v9v = "H2X", P13 = "q2X", M1v = "ces", H68 = "imalPl", W7B = "tD"; if (!price || typeof price == C53) return Z3y; var yAxis = panel[n5K], decimalPlaces = yAxis[(V08 + a6Z + W7B + K1y + j1y + H68 + I4y + M1v)]; if (S9y4F[P13](decimalPlaces, S9y4F.o6i)) { if (S9y4F[(Q8y + S9y4F.l5K + e7y)](yAxis[C1v], o58)) decimalPlaces = S9y4F.a3B; else if (S9y4F[v9v](yAxis[C1v], M0Z)) decimalPlaces = S9y4F.o7B; else if (S9y4F[z7v](yAxis[C1v], S9y4F.K3B)) decimalPlaces = S9y4F.V3B; else decimalPlaces = S9y4F.Y3B; }
			if (S9y4F[(p68 + e7y)](panel[s5i], panel[n48][s5i])) {
				if (S9y4F[s2y](price, B2i) || price < -B2i) { return STX[m28](price); }
			}
			if (this[p4M]) { price = this[p4M][E4v][decimalPlaces][i88](price); }
			else { price = price[f5M](decimalPlaces); }
			return price;
		}
		; STXChart.prototype.formatPrice = function (price, panel) {
			var b8y = "atte", H5i = "orm", T1M = "nal", O0v = "ntern", J0K = "liz", b4K = "ernat", a3K = "M2X", z0M = "X2X"; if (!price || typeof price == C53) return Z3y; if (!panel) panel = this[(m68 + S9y4F.b3y + S9y4F.b3y + K1y + a6Z + S9y4F.t3y + Y1Z + a6Z + K1y + J6Z)]; var decimalPlaces = panel[z1Z]; if (!decimalPlaces && S9y4F[z0M](decimalPlaces, S9y4F.Y3B)) { decimalPlaces = panel[n48][z1Z]; }
			if (!decimalPlaces && S9y4F[(a3K)](decimalPlaces, S9y4F.Y3B)) { return price; }
			if (this[(G7i + S9y4F.t3y + b4K + S9y4F.W0Z + B6Z + X7K + J0K + K1y + S9y4F.b3y)]) { price = this[(S9y4F.W0Z + O0v + I4y + y8K + T1M + r4i + I13)][(k5Z + e5i + W3B + H5i + b8y + S9y4F.b3y + S9y4F.a5Z)][decimalPlaces][i88](price); }
			else { price = price[f5M](decimalPlaces); }
			return price;
		}
		; STXChart.prototype.createCrosshairs = function () {
			var H9Z = "Crosshair"; if (this[G5Z](u63, arguments)) return; if (this[(q9M + U8i + J6Z + S9y4F.a5Z)][K33][U4M]) return; this[E0y][Y73][U4M] = function (e) { if (!e) e = event; if (e[b63]) e[b63](); return j8Z; }
			; this[E0y][K33][U4M] = function (e) { if (!e) e = event; if (e[b63]) e[b63](); return j8Z; }
			; this[P9i]((Z5i + H2y + H9Z + S9y4F.a5Z), arguments);
		}
		; STXChart.prototype.createVolumeChart = function (chart) {
			var a1Z = "_y", M8Z = "sFon", I2M = "nse", m83 = "F8X", p2v = "j8X", h5M = "K8X", x9v = "V8X", Q1M = "R2X", d63 = "l2X", G6K = "b2X", p1y = "ab", R7M = "vail", s43 = "olume", e6Z = "watermark", q7M = "E2X", x63 = "J2X", h7y = "k2X", k88 = "T2X", o9y = "D2X"; if (this[G5Z]("createVolumeChart", arguments)) return; var quotes = chart[q3B], context = this[n48][U83]; chart[H3M] = 0; for (var i = 0; S9y4F[o9y](i, chart[H58]) ; i++) { var prices = quotes[i]; if (S9y4F[k88](prices, null)) continue; if (S9y4F[h7y](prices[e43], chart[H3M])) chart[H3M] = prices[e43]; }
			var vchart = this[w2K]["vchart"]; if (S9y4F[x63](vchart, null) || S9y4F[(S9y4F.a5Z + S9y4F.l5K + e7y)](vchart[A9y], true)) return; if (S9y4F[q7M](chart[H3M], 0)) { this[e6Z]("vchart", "center", "bottom", this[W5v]((H7y + s43 + V2v + D5y + Z43 + V2v + S9y4F.E2K + R7M + p1y + r3y))); }
			var fontHeight = this[X88]("stx_yaxis"); vchart.height = S9y4F[G6K](vchart[C2Z], vchart.top); vchart[O3B] = chart[H3M]; vchart[d5y] = 0; vchart[L8y] = chart[H3M]; var verticalTicks = Math[E08](S9y4F[d63](vchart.height, (fontHeight * 2))), spacing = S9y4F[Q1M](vchart.height, verticalTicks); vchart[S4y] = S9y4F[x9v](chart[(S9y4F.u7Z + Y33 + B3y + Y9Z + K1y + H3v + P7Z)], verticalTicks); context.textBaseline = "middle"; for (var i = 0; S9y4F[h5M](i, verticalTicks) ; i++) { var y = S9y4F[p2v](i, spacing), px = S9y4F[(S9y4F.W0Z + N3K + e7y)](vchart[O3B], vchart.height), amount = vchart[d5y] + S9y4F[m83](y, px), volume = STX[(R48 + a6Z + u4y + K1y + I2M + q9i + S9y4F.t3y)](amount); this[(z88 + x9K + I4y + M8Z + S9y4F.t3y)]((S9y4F.a5Z + F2Z + a1Z + I4y + P7Z + V2i)); this[a0y]("stx_yaxis"); context.fillText(volume, this[n48].width, S9y4F[(S9y4F.E2K + N3K + e7y)](vchart[C2Z], y)); }
			context.textBaseline = "alphabetic"; if (this[P9i]("createVolumeChart", arguments)) return;
		}
		; STXChart.prototype.determineMinMax = function (quotes, fields) {
			var O1Z = "B8X", o1v = "h8X", o1M = "P8X", highValue = -2000000000, lowValue = 2000000000; for (var i = 0; S9y4F[o1M](i, quotes.length) ; i++) {
				var quote = quotes[i]; if (!quote) continue; if (quote.transform) quote = quote.transform; for (var j = 0; S9y4F[o1v](j, fields.length) ; j++) {
					var val = quote[fields[j]]; if (val || S9y4F[(S9y4F.t3y + N3K + e7y)](val, 0)) { if (S9y4F[O1Z](val, highValue)) highValue = val; if (S9y4F[(S9y4F.b3y + N3K + e7y)](val, lowValue)) lowValue = val; }
				}
			}
			return [lowValue, highValue];
		}
		; STXChart.prototype.initializeDisplay = function (chart) {
			var J5v = "Di", g4Z = "tiali", l5i = "m7X", h0K = "Q7X", j2i = "N7X", v5i = "Z7X", D3v = "a7X", H5M = "lowValue", q1Z = "n7X", e9v = "C7X", v8M = "lowVal", s7v = "L7X", M4K = "c7X", d9i = "g8X", N1i = "O8X", L8Z = "determineMinMax", t0K = "p8X", n1K = "x8X", i38 = "y8X", h0M = "pus", v5y = "para"; if (this[G5Z]("initializeDisplay", arguments)) return; var fields = []; for (var field in chart[B9i]) { if (chart[B9i][field][(v5y + Y9Z + j23 + K1y + S9y4F.b3y + S9y4F.a5Z)][b8i]) fields[(h0M + S9y4F.n0Z)](field); }
			chart[v73] = panel = this[w2K][chart[(a6Z + C3B + K1y)]]; var yAxis = panel[n5K], cheight = panel.height, high = low = null; if (!yAxis[v9Z]) yAxis[v9Z] = this[g6v]; yAxis[C2Z] = S9y4F[i38](panel[C2Z], yAxis[v9Z]); yAxis.top = panel.top; yAxis.height = S9y4F[(q4Z + N3K + e7y)](yAxis[C2Z], yAxis.top); var minMax; if (S9y4F[n1K](this[v3Z][c88], "line") || S9y4F[t0K](this[v3Z][c88], "mountain")) { fields[e8Z]("Close"); minMax = this[L8Z](chart[q3B], fields); }
			else { fields[(D4M + t9y)]("Close", "High", "Low"); minMax = this[L8Z](chart[q3B], fields); }
			var verticalPad = Math[E08](Math[F0Z](S9y4F[(N1i)](cheight, 5))); if (S9y4F[d9i](cheight - Math[F0Z](yAxis[i2v]), verticalPad)) { yAxis[i2v] = (S9y4F[(M4K)](cheight, verticalPad)) * (S9y4F[s7v](yAxis[i2v], 0) ? -1 : 1); }
			chart[(v8M + l5v)] = minMax[0]; chart[K18] = minMax[1]; var pricePerPix = S9y4F[e9v]((chart[K18] - chart[(J6Z + E13 + U5M)]), yAxis.height); if (S9y4F[q1Z](chart[(S9y4F.n0Z + S9y4F.W0Z + h63 + H7y + B4i)] - chart[H5M], 0)) { high = S9y4F[(D3v)](chart[K18], 2); low = 0; }
			else {
				if (this[v3Z][x4i] && high) { var logLow = S9y4F[v5i](Math[e48](chart[H5M]), Math[c0i]), logHigh = S9y4F[j2i](Math[e48](chart[K18]), Math[c0i]); high = Math[E5v](10, logHigh); low = Math[E5v](10, logLow); }
				else { high = chart[K18]; low = chart[H5M]; }
			}
			yAxis[V58] = high; yAxis[(W58)] = low; yAxis[O3B] = S9y4F[h0K](yAxis[V58], yAxis[W58]); if (S9y4F[l5i](yAxis[x4i], this[v3Z][x4i])) { this[t9K](); yAxis[x4i] = this[v3Z][x4i]; }
			var parameters = {}
			; this[v4K](panel, parameters); this[Q28](panel, parameters); this[P9i]((S9y4F.W0Z + a6Z + S9y4F.W0Z + g4Z + L0i + J5v + x0y), arguments);
		}
		; STXChart.prototype.computePosition = function (x, offset) { var K9i = "U7X"; if (typeof offset == C53) offset = S9y4F.Y3B; var position = S9y4F[K9i](x, this[v3Z][C9i]) + offset; return position; }
		; STXChart.prototype.computeColor = function (open, close) { var E6M = "I7X", S1i = "w7X"; if (S9y4F[S1i](open, close)) return Z3Z; if (S9y4F[E6M](open, close)) return X53; return u6i; }
		; STXChart.prototype.computeLength = function (high, low) { var V43 = "W7X", h = this[o4K](high), l = this[o4K](low); return S9y4F[V43](l, h); }
		; STXChart.prototype.volUnderlay = function (chart) {
			var T2M = "S3X", P7K = "G3X", P0y = "H3", x0v = "Y3X", C2M = "q3X", U6K = "o7X", W5i = "u7X", d4K = "v7X", B93 = "isIE8", H2Z = "e7X", J7y = "d7X"; if (S9y4F[J7y](chart[H3M], 0)) return; var quotes = chart[q3B], context = this[n48][U83], c = chart[v73], b = c[n5K][C2Z], t = c.yAxis.top, h = S9y4F[H2Z]((b - t), .25), quotes = chart[q3B]; this[a0y]("stx_volume_underlay"); if (STX[B93]) context.globalAlpha = .2; context.beginPath(); for (var i = 0; S9y4F[d4K](i, quotes.length) ; i++) { var quote = quotes[i]; if (S9y4F[W5i](quote, null)) continue; var y = S9y4F[U6K](quote[e43], (h / chart[H3M])), top = (S9y4F[C2M](b, h)) + (S9y4F[x0v](h, y)), myWidth = S9y4F[(P0y + e7y)](this[v3Z][C9i], 2); if (S9y4F[P7K](myWidth, 2)) myWidth = 1; var x0 = S9y4F[T2M](i, this[v3Z][C9i]) + 1, x1 = x0 + myWidth; context.moveTo(x0, top); context.lineTo(x1, top); context.lineTo(x1, b); context.lineTo(x0, b); context.lineTo(x0, top); }
			context.fill(); context.closePath(); context.globalAlpha = 1;
		}
		; STXChart.prototype.volbar = function (x, prices) { var a8M = "ttom", h9M = "J3X", H7Z = "k3X", v2M = "T3X", v78 = "D3X", j6y = "M3X", N98 = "X3X", C1Z = "Max", X3M = "vol", E2Z = "z3X"; if (S9y4F[E2Z](this[n48][(X3M + B3y + Y9Z + K1y + C1Z)], 0)) return; var vchart = this[(k5Z + I4y + P8K + J6Z + S9y4F.a5Z)]["vchart"]; if (S9y4F[N98](vchart, null) || S9y4F[j6y](vchart[A9y], true)) return; var y = S9y4F[v78](prices[e43], (vchart.height / this[n48][H3M])), top = vchart.top + (S9y4F[v2M](vchart.height, y)), myWidth = S9y4F[H7Z](this[v3Z][C9i], 2); if (S9y4F[h9M](myWidth, 2)) myWidth = 1; var x0 = this[m7y](x, 1), x1 = x0 + myWidth; this[n48][U83].moveTo(x0, top); this[n48][U83].lineTo(x1, top); this[n48][U83].lineTo(x1, vchart[(Q4y + B6Z + a8M)]); this[n48][U83].lineTo(x0, vchart[C2Z]); this[n48][U83].lineTo(x0, top); }
		; STXChart.prototype.startClip = function (panel) { var J3M = "s3X"; if (!panel) panel = n48; var c = this[(w2K)][panel]; this[n48][U83].save(); this[n48][U83].beginPath(); this[n48][U83].rect(0, c.top, this[n48].width, S9y4F[J3M](c[(c9i + B6Z + Y9Z)], c.top)); this[n48][U83].clip(); }
		; STXChart.prototype.endClip = function () { this[n48][U83].restore(); }
		; STXChart.prototype.drawCandles = function (chart, fillColor, borderColor, condition) {
			var R58 = "N6b", p9y = "Z6b", a7M = "a6b", X9v = "n6b", V8K = "C6b", a0K = "L6b", v1y = "c6b", w2M = "g5b", Z8y = "O5b", p63 = "p5b", i83 = "oor", D73 = "fl", a1M = "x5b", T6M = "f5b", S83 = "y5b", k4M = "eL", U3Z = "cach", E5i = "r5b", l3Z = "B5b", x0K = "t5b", P7M = "h5b", Y5v = "DOW", P8i = "SE", S43 = "LO", s9y = "P5b", R3B = "ose", N83 = "qPrevCl", B9K = "A5b", R08 = "F5b", D4v = "i5b", m3B = "j5b", U8K = "K5b", C5M = "LEUP", T3B = "AND", X1M = "V5b", a9M = "R3X", y3K = "l3X", r5v = "b3X", J43 = "E3X", quotes = chart[q3B], context = this[n48][(R48 + U0K + M3v)], panel = chart[(W0i + K1y + J6Z)], t = panel.yAxis.top, b = panel[n5K][C2Z], top, bottom, length, borderOffset = 0; if (!STX[g58](borderColor)) borderOffset = .5; var leftTick = S9y4F[J43](chart[B6K].length, chart[i2v]), rightTick = leftTick + chart[H58]; context.beginPath(); context.fillStyle = fillColor; var yAxis = panel[n5K]; for (var x = 0; S9y4F[r5v](x, quotes.length) ; x++) {
				var quote = quotes[x]; if (S9y4F[y3K](quote, null)) continue; if (quote[k3Z]) continue; if (S9y4F[a9M](quote[(q6v)], quote[Y88])) continue; if (S9y4F[X1M](condition, STXChart[(G2K + T3B + C5M)]) && S9y4F[U8K](quote[(b5y + k5Z + H43)], quote[Y88])) continue; if (S9y4F[m3B](condition, STXChart[b1v]) && S9y4F[D4v](quote[q6v], quote[Y88])) continue; if (S9y4F[R08](condition, STXChart[o98]) && S9y4F[B9K](quote[Y88], quote[(S9y4F.W0Z + N83 + R3B)])) continue; if (S9y4F[s9y](condition, STXChart[(G2K + S43 + P8i + Y5v + D5y)]) && S9y4F[P7M](quote[Y88], quote[W9K])) continue; if (S9y4F[x0K](condition, STXChart[J1K]) && S9y4F[l3Z](quote[Y88], quote[W9K])) continue; if (quote.transform) quote = quote.transform; var cache = quote[w5Z], tick = leftTick + x; if (S9y4F[E5i](tick, panel[(U3Z + k4M + K1y + q4Z + S9y4F.t3y)]) || S9y4F[S83](tick, panel[c7i]) || !cache[h6i]) {
					var o = (yAxis[x4i] ? this[o4K](quote[q6v], panel) : (S9y4F[T6M]((yAxis[V58] - quote[q6v]), yAxis[S4y])) + yAxis.top), c = (yAxis[x4i] ? this[o4K](quote[Y88], panel) : (S9y4F[a1M]((yAxis[V58] - quote[Y88]), yAxis[S4y])) + yAxis.top); top = Math[z0Z](Math[d5y](o, c)) + borderOffset; bottom = Math[L8y](o, c); length = Math[(D73 + i83)](S9y4F[p63](bottom, top)); if (S9y4F[Z8y](top, t)) {
						if (S9y4F[w2M](top + length, t)) { cache[h6i] = top; cache[F9Z] = top; continue; }
						length -= S9y4F[v1y](t, top); top = t;
					}
					if (S9y4F[a0K](top + length, b)) { length -= (top + length - b); }
					length = Math[L8y](length, 2); cache[h6i] = top; cache[F9Z] = cache[h6i] + length;
				}
				if (S9y4F[V8K](cache[h6i], b)) continue; if (S9y4F[X9v](cache[F9Z], t)) continue; var x0 = Math[z0Z](S9y4F[a7M](x, this[v3Z][C9i])) + borderOffset, x1 = x0 + this[Q73] - (S9y4F[p9y](borderOffset, 2)); if (S9y4F[R58](quote[q6v], quote[Y88])) { top = S9y4F[(r7B + r8K + Q4y)](Math[E08](cache[h6i]), borderOffset); context.moveTo(x0, top); context.lineTo(x1, top); }
				else { context.moveTo(x0, cache[h6i]); context.lineTo(x1, cache[h6i]); context.lineTo(x1, cache[F9Z]); context.lineTo(x0, cache[F9Z]); context.lineTo(x0, cache[h6i]); }
			}
			context.fill(); if (borderOffset) { context.lineWidth = 1; context.strokeStyle = borderColor; context.stroke(); }
			context.closePath();
		}
		; STXChart.prototype.drawShadows = function (chart, style, condition) {
			var W28 = "R9b", j4v = "l9b", N4Z = "b9", V3Z = "s9b", l43 = "9b", P6K = "k9b", m6i = "T9b", K8Z = "D9b", n0M = "M9b", P83 = "X9b", v6K = "z9b", u6v = "S9b", H4y = "G9b", b83 = "H9b", h8y = "Y9b", j8K = "q9b", o4v = "o6b", f4i = "u6b", P3Z = "v6b", I88 = "e6b", W3y = "d6b", q5M = "iqPre", B2M = "W6b", i1M = "I6b", j4y = "w6b", V7i = "U6b", V48 = "m6b", quotes = chart[q3B], context = this[n48][U83], panel = chart[v73]; context.lineWidth = 1; var t = panel.yAxis.top, b = panel[n5K][(Q4y + B6Z + S9y4F.t3y + t0Z + Y9Z)], top, bottom, left, leftTick = S9y4F[(V48)](chart[B6K].length, chart[i2v]), rightTick = leftTick + chart[H58]; context.beginPath(); var yAxis = panel[n5K]; for (var x = 0; S9y4F[V7i](x, quotes.length) ; x++) {
				var quote = quotes[x]; if (S9y4F[j4y](quote, null)) continue; if (quote[k3Z]) continue; if (condition) { if (S9y4F[i1M](condition, STXChart[o98]) && S9y4F[B2M](quote[Y88], quote[(q5M + X7Z + L28 + K1y)])) continue; else if (S9y4F[W3y](condition, STXChart[w0M]) && S9y4F[I88](quote[Y88], quote[W9K])) continue; else if (S9y4F[P3Z](condition, STXChart[J1K]) && S9y4F[f4i](quote[Y88], quote[W9K])) continue; }
				if (quote.transform) quote = quote.transform; var cache = quote[w5Z], tick = leftTick + x; if (S9y4F[o4v](tick, panel[Y38]) || S9y4F[j8K](tick, panel[c7i]) || !cache.top) {
					top = (yAxis[x4i] ? this[o4K](quote[P5y], panel) : (S9y4F[h8y]((yAxis[(S9y4F.n0Z + S9y4F.W0Z + h63)] - quote[P5y]), yAxis[S4y])) + yAxis.top); bottom = (yAxis[x4i] ? this[o4K](quote[a3v], panel) : (S9y4F[b83]((yAxis[V58] - quote[a3v]), yAxis[S4y])) + yAxis.top); length = S9y4F[H4y](bottom, top); if (S9y4F[u6v](top, t)) {
						if (S9y4F[v6K](top + length, t)) { cache.top = top; cache[C2Z] = top; continue; }
						length -= S9y4F[P83](t, top); top = t;
					}
					if (S9y4F[n0M](top + length, b)) { length -= (top + length - b); }
					cache.top = top; cache[C2Z] = cache.top + length;
				}
				if (S9y4F[K8Z](cache.top, b)) continue; if (S9y4F[m6i](cache[C2Z], t)) continue; var xx = Math[z0Z](Math[z0Z](S9y4F[P6K](x, this[v3Z][C9i])) + (S9y4F[(J6y + l43)](this[Q73], 2))) + .5; context.moveTo(xx, cache.top); context.lineTo(xx, cache[C2Z]); if (S9y4F[V3Z](quote[q6v], quote[Y88])) {
					var x0 = S9y4F[(d9y + l43)](xx, this[O1M]), x1 = xx + this[O1M], o = (yAxis[x4i] ? this[o4K](quote[q6v], panel) : (S9y4F[(N4Z + Q4y)]((yAxis[(S9y4F.n0Z + z5K)] - quote[q6v]), yAxis[S4y])) + yAxis.top); if (S9y4F[j4v](o, b) && S9y4F[W28](o, t)) { context.moveTo(x0, o); context.lineTo(x1, o); }
				}
			}
			this[a0y](style); context.stroke(); context.closePath();
		}
		; STXChart.prototype.scatter = function (chart) {
			var C7v = "h0b", Z5M = "P0b", U68 = "A0b", t8v = "F0b", a4i = "i0b", b6K = "Scatter", y9K = "j0b", quotes = chart[q3B], context = this[n48][U83]; context.beginPath(); context.lineWidth = 4; var t = chart.panel.yAxis.top, b = chart[v73][n5K][C2Z]; for (var x = 0; S9y4F[(H7y + a2M)](x, quotes.length) ; x++) {
				var quote = quotes[x]; if (S9y4F[(c9y + y6K + Q4y)](quote, null)) continue; if (!quote[k3Z]) {
					if (quote.transform) quote = quote.transform; var scatter = [quote[Y88]]; if (S9y4F[y9K]("Scatter", quote)) scatter = quote[b6K]; for (var i = 0; S9y4F[a4i](i, scatter.length) ; i++) { var top = this[o4K](scatter[i], chart[v73]); if (S9y4F[t8v](top, t)) continue; if (S9y4F[U68](top, b)) continue; var xx = S9y4F[Z5M](x, this[v3Z][C9i]), xxo = xx + this[O1M]; context.moveTo(S9y4F[C7v](xxo, 2), top); context.lineTo(xxo + 2, top); }
				}
			}
			this[a0y]("stx_scatter_chart"); context.stroke(); context.closePath();
		}
		; STXChart.prototype.drawBarChart = function (chart, style, condition) {
			var g2y = "v4b", t73 = "e4b", d9K = "d4b", T9K = "W4", g6K = "I4b", r6v = "w4b", M7M = "U4b", V9K = "m4b", t7Z = "Q4b", o03 = "N4b", q0v = "Z4b", q5i = "a4b", f93 = "n4b", o7Z = "C4b", F88 = "L4b", i18 = "c4b", R9Z = "g0b", g03 = "O0b", d1y = "p0b", s1y = "x0b", m7B = "f0b", R5y = "y0b", n2K = "r0b", x08 = "t0b", quotes = chart[q3B], panel = chart[v73], context = chart[U83]; context.beginPath(); context.lineWidth = 1; var t = panel.yAxis.top, b = panel[n5K][C2Z], top, bottom, length, leftTick = S9y4F[x08](chart[B6K].length, chart[i2v]), rightTick = leftTick + chart[H58], yAxis = panel[n5K]; for (var x = 0; S9y4F[(B2K + a2M)](x, quotes.length) ; x++) {
				var quote = quotes[x]; if (S9y4F[n2K](quote, null)) continue; if (quote[k3Z]) break; if (condition) { if (S9y4F[R5y](condition, STXChart[o98]) && S9y4F[m7B](quote[Y88], quote[W9K])) continue; else if (S9y4F[s1y](condition, STXChart[w0M]) && S9y4F[d1y](quote[Y88], quote[W9K])) continue; else if (S9y4F[g03](condition, STXChart[J1K]) && S9y4F[R9Z](quote[Y88], quote[W9K])) continue; }
				if (quote.transform) quote = quote.transform; var cache = quote[w5Z], tick = leftTick + x; if (S9y4F[i18](tick, panel[Y38]) || S9y4F[F88](tick, panel[c7i]) || !cache.top) {
					top = this[o4K](quote[(V4y + z5K)], panel); bottom = this[o4K](quote[a3v], panel); length = S9y4F[o7Z](bottom, top); cache[h6i] = (yAxis[x4i] ? this[o4K](quote[(b5y + k5Z + K1y + a6Z)], panel) : (S9y4F[f93]((yAxis[(S9y4F.n0Z + S9y4F.W0Z + h63)] - quote[q6v]), yAxis[S4y])) + yAxis.top); cache[F9Z] = (yAxis[x4i] ? this[o4K](quote[Y88], panel) : (S9y4F[q5i]((yAxis[V58] - quote[Y88]), yAxis[S4y])) + yAxis.top); if (S9y4F[q0v](top, t)) {
						if (S9y4F[o03](top + length, t)) { cache.top = top; cache[C2Z] = top; continue; }
						length -= S9y4F[t7Z](t, top); top = t;
					}
					if (S9y4F[V9K](top + length, b)) { length -= (top + length - b); }
					cache.top = top; cache[C2Z] = top + length;
				}
				var xx = S9y4F[M7M](x, this[(J6Z + g83 + S9y4F.t3y)][C9i]), xxo = xx + this[O1M]; if (S9y4F[r6v](cache.top, b) && S9y4F[g6K](cache[C2Z], t)) { var xx2 = Math[E08](xxo) + .5; context.moveTo(xx2, cache.top); context.lineTo(xx2, cache[C2Z]); }
				if (S9y4F[(T9K + Q4y)](cache[(S73 + H43)], t) && S9y4F[d9K](cache[h6i], b)) { context.moveTo(xx, cache[h6i]); context.lineTo(xxo, cache[h6i]); }
				if (S9y4F[t73](cache[F9Z], t) && S9y4F[g2y](cache[F9Z], b)) { context.moveTo(xxo, cache[F9Z]); context.lineTo(xxo + this[O1M], cache[F9Z]); }
			}
			this[(z88 + a6Z + S9y4F.u7Z + I4y + V6i + B6Z + J6Z + B6Z + S9y4F.b3y)](style); context.stroke(); context.closePath();
		}
		; STXChart.prototype.plotLineChart = function (panel, quotes, field, parameters) {
			var J6K = "k1b", j3y = "label", d6i = "T1b", j8y = "D1b", P53 = "X1b", e3B = "z1b", s9K = "S1b", r0v = "G1b", m8y = "eft", q8M = "H1b", K3K = "Y1b", a6i = "je", T63 = "q1b", W4y = "o4b", y6Z = "u4b", F4Z = "for", A8M = "ans", Q6y = "pTr", B6y = "sk", skipProjections = false, skipTransform = false; if (parameters) { skipProjections = parameters[I6y]; skipTransform = parameters[(B6y + S9y4F.W0Z + Q6y + A8M + F4Z + Y9Z)]; }
			var chart = panel[n48], context = this[n48][U83]; context.beginPath(); var first = true, reset = false, yAxis = panel[(N9M + P7Z + S9y4F.W0Z + S9y4F.a5Z)], t = yAxis.top, b = yAxis[(Y0i + i1Z + E73)], leftTick = S9y4F[y6Z](chart[B6K].length, chart[i2v]), rightTick = leftTick + chart[H58], lastVal = null; for (var i = 0; S9y4F[W4y](i, quotes.length) ; i++) {
				var quote = quotes[i]; if (S9y4F[T63](quote, null)) continue; if (skipProjections && quote[(T7M + B6Z + a6i + j1y + i6Z + h73)]) break; if (!skipTransform && quote.transform) quote = quote.transform; var cache = quote[w5Z], tick = leftTick + i; if (!quote[field] && S9y4F[K3K](quote[field], 0)) continue; lastVal = quote[field]; if (S9y4F[q8M](tick, panel[(j1y + I4y + j1y + A33 + S9y4F.N9y + m8y)]) || S9y4F[r0v](tick, panel[c7i]) || !cache[field]) { cache[field] = (yAxis[(S9y4F.a5Z + I43 + a88 + a63)] ? this[o4K](lastVal, panel) : (S9y4F[s9K]((yAxis[(y5M + A4Z + S9y4F.n0Z)] - lastVal), yAxis[S4y])) + yAxis.top); }
				var x = S9y4F[e3B](i, this[v3Z][C9i]) + this[O1M]; if (S9y4F[P53](i, 0)) { x = 0; }
				else if (S9y4F[(G5y + u6K + Q4y)](i, quotes.length - 1)) { x += this[O1M]; }
				var y = cache[field]; if (S9y4F[j8y](y, t)) {
					y = t; if (reset) { context.moveTo(x, y); continue; }
					reset = true;
				}
				else if (S9y4F[d6i](y, b)) {
					y = b; if (reset) { context.moveTo(x, y); continue; }
					reset = true;
				}
				else { reset = false; }
				if (first) { first = false; context.moveTo(x, y); }
				else { context.lineTo(x, y); }
			}
			context.stroke(); context.closePath(); if (parameters[j3y] && S9y4F[J6K](lastVal, null)) {
				var txt; if (yAxis[o73]) { txt = yAxis[o73](this, panel, lastVal); }
				else { txt = this[Y2v](lastVal, panel); }
				this[K03](panel, txt, y, context.strokeStyle, "#FFFFFF");
			}
		}
		; STXChart.prototype.plotMountainChart = function (panel, quotes, field, parameters) {
			var m7i = "t2", q7y = "h2b", B1v = "P2b", f6y = "A2b", t4y = "F2b", h4Z = "i2b", F33 = "j2b", B5y = "K2b", K1i = "V2b", c73 = "R1b", e0M = "l1b", C33 = "b1b", s48 = "1b", F3B = "s1b", h8i = "J1b", T4K = "skipTransform", skipProjections = false, skipTransform = false; if (parameters) { skipProjections = parameters[I6y]; skipTransform = parameters[T4K]; }
			var chart = panel[(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y)], context = this[n48][U83]; context.beginPath(); var first = true, reset = false, t = panel.yAxis.top, b = panel[n5K][C2Z], leftTick = S9y4F[h8i](chart[(e3M + S9y4F.t3y + g2Z + S9y4F.t3y)].length, chart[i2v]), rightTick = leftTick + chart[H58], firstX = null, firstY = null, strokeStyle = context.strokeStyle, yAxis = panel[n5K]; for (var i = 0; S9y4F[F3B](i, quotes.length) ; i++) {
				var quote = quotes[i]; if (S9y4F[(d9y + s48)](quote, null)) continue; if (skipProjections && quote[k3Z]) break; if (!skipTransform && quote.transform) quote = quote.transform; var cache = quote[(j1y + h7Z + K1y)], tick = leftTick + i; if (S9y4F[C33](tick, panel[Y38]) || S9y4F[e0M](tick, panel[c7i]) || !cache[field]) { if (!quote[field] && S9y4F[c73](quote[field], 0)) continue; cache[field] = (yAxis[x4i] ? this[o4K](quote[field], panel) : (S9y4F[K1i]((yAxis[V58] - quote[field]), yAxis[S4y])) + yAxis.top); }
				var x = S9y4F[B5y](i, this[v3Z][C9i]) + this[O1M]; if (S9y4F[F33](i, 0)) { x = 0; }
				else if (S9y4F[h4Z](i, quotes.length - 1)) { x += this[O1M]; }
				if (S9y4F[t4y](firstX, null)) firstX = x; var y = cache[field]; if (S9y4F[f6y](firstY, null)) firstY = y; if (S9y4F[B1v](y, t)) {
					y = t; if (reset) { context.lineTo(x, y); continue; }
					reset = true;
				}
				else if (S9y4F[q7y](y, b)) {
					y = b; if (reset) { context.lineTo(x, y); continue; }
					reset = true;
				}
				else { reset = false; }
				if (first) { first = false; context.moveTo(x, y); }
				else { context.lineTo(x, y); }
			}
			context.lineTo(x, b); context.lineTo(firstX, b); if (S9y4F[(m7i + Q4y)](firstY, b)) firstY = b; context.lineTo(firstX, firstY); context.fill(); context.closePath();
		}
		; STXChart.prototype.drawLineChart = function (chart) {
			var b5i = "B2b", context = this[n48][U83], c = this[j2M]("stx_line_chart"); if (c.width && S9y4F[b5i](parseInt(c.width, 10), 25)) { context.lineWidth = Math[(Y9Z + I4y + P7Z)](1, STX[i1y](c.width)); }
			else { context.lineWidth = 1; }
			this[a0y]("stx_line_chart"); this[C43](chart[v73], chart[q3B], "Close", { skipProjections: true }
			);
		}
		; STXChart.prototype.drawMountainChart = function (chart) {
			var v1i = "f2b", e1M = "plotMountainChart", q8Z = "y2b", t6i = "ripP", v1Z = "r2b", context = this[n48][U83], c = this[j2M]("stx_mountain_chart"); if (c.width && S9y4F[v1Z](parseInt(c.width, 10), 25)) { context.lineWidth = Math[L8y](1, STX[(O4y + t6i + e7y)](c.width)); }
			else { context.lineWidth = 1; }
			var panel = this[n48][v73], top = this[o4K](this[n48][K18], panel); if (isNaN(top)) top = 0; var backgroundColor = c["backgroundColor"], color = c["color"]; if (color && S9y4F[q8Z](color, "transparent")) { var gradient = context.createLinearGradient(0, top, 0, panel[n5K][C2Z]); gradient.addColorStop(0, backgroundColor); gradient.addColorStop(1, color); context.fillStyle = gradient; }
			else { context.fillStyle = backgroundColor; }
			this[e1M](panel, chart[q3B], "Close", { skipProjections: true }
			); var strokeStyle = c["borderTopColor"]; if (strokeStyle && S9y4F[v1i](strokeStyle, "transparent")) {
				context.strokeStyle = strokeStyle; this[C43](panel, chart[q3B], "Close", { skipProjections: true }
				);
			}
		}
		; STXChart.prototype.drawWaveChart = function (chart) {
			var I8M = "u8b", a4M = "8b", J0y = "e8b", H6i = "d8b", H38 = "W8b", g4i = "I8b", f6M = "pixe", j78 = "w8b", r0Z = "U8b", i93 = "m8b", z8Z = "Hi", i5Z = "Pr", h3Z = "Q8b", o0y = "N8b", H88 = "Z8b", K2K = "a8b", G9y = "n8b", q03 = "C8", A1Z = "L8b", a2v = "c8b", X0K = "g2b", n6v = "O2b", h88 = "p2b", M88 = "x2b", s23 = "Volum", H83 = (46. <= (2.42E2, 6.13E2) ? (7.9E2, 4164276) : (0x17, 5.41E2) > (115., 6.19E2) ? "pan" : (14.370E2, 0x1DB)), R9i = 1760966, B4K = ((148., 0x21F) >= 65. ? (0x1BC, 1923958936) : (1.68E2, 10.34E2)), v2Z = 1774784023, quotes = chart[q3B]; var G3h = v2Z, a3h = B4K, i3h = S9y4F.V3B; for (var n3h = S9y4F.K3B; S9y4F.w7h.r7h(n3h.toString(), n3h.toString().length, R9i) !== G3h; n3h++) { printProjection(this, this.drawingObjects[i]); minutes++; this.quoteDriver.checkLoadMore(chart); this.resizePanels(); this.stackPanel(panel.display, p, panel.percent, panel.chartName); i3h += S9y4F.V3B; }
			if (S9y4F.w7h.r7h(i3h.toString(), i3h.toString().length, H83) !== a3h) { e.wheelDeltaX && (e.deltaX = -S9y4F.K3B / y4Z * e.wheelDeltaX); m_Volume.initialize(recordCount, (s23 + K1y)); i(S9y4F.Y3B); return z6 > N6; }
			var panel = chart[v73], context = this[n48][U83]; context.beginPath(); var first = false, reset = false, t = panel.yAxis.top, b = panel[n5K][C2Z]; for (var i = 0; S9y4F[M88](i, quotes.length) ; i++) {
				var quote = quotes[i]; if (S9y4F[h88](quote, null)) continue; if (quote[k3Z]) break; if (quote.transform) quote = quote.transform; var x = S9y4F[n6v](i, this[v3Z][C9i]) + this[O1M], y = this[o4K](quote[q6v], panel); if (S9y4F[X0K](y, t)) {
					y = t; if (reset) { context.moveTo(x, y); continue; }
					reset = true;
				}
				else if (S9y4F[a2v](y, b)) {
					y = b; if (reset) { context.moveTo(x, y); continue; }
					reset = true;
				}
				else { reset = false; }
				if (!first) { first = true; context.moveTo(x, y); }
				else { context.lineTo(x, y); }
				x += S9y4F[(A1Z)](this[v3Z][C9i], 4); if (S9y4F[(q03 + Q4y)](quote[q6v], quote[Y88])) { y = this[o4K](quote[a3v], panel); if (S9y4F[G9y](y, t)) y = t; if (S9y4F[K2K](y, b)) y = b; context.lineTo(x, y); x += S9y4F[H88](this[v3Z][C9i], 4); y = this[o4K](quote[(P5y)], panel); if (S9y4F[o0y](y, t)) y = t; if (S9y4F[h3Z](y, b)) y = b; context.lineTo(x, y); }
				else { y = this[(j6M + P7Z + b73 + f0y + B6Z + Y9Z + i5Z + S9y4F.W0Z + F28)](quote[(z8Z + h63)], panel); if (S9y4F[i93](y, t)) y = t; if (S9y4F[r0Z](y, b)) y = b; context.lineTo(x, y); x += S9y4F[j78](this[v3Z][C9i], 4); y = this[(f6M + J6Z + G0y + U8i + l0Z + S9y4F.b3y + S9y4F.W0Z + F28)](quote[a3v], panel); if (S9y4F[g4i](y, t)) y = t; if (S9y4F[H38](y, b)) y = b; context.lineTo(x, y); }
				x += S9y4F[H6i](this[v3Z][C9i], 4); y = this[o4K](quote[Y88], panel); if (S9y4F[J0y](y, t)) y = t; if (S9y4F[(S9y4F.u7Z + a4M)](y, b)) y = b; context.lineTo(x, y);
			}
			var c = this[j2M]("stx_line_chart"); if (c.width && S9y4F[I8M](parseInt(c.width, 10), 25)) { context.lineWidth = Math[L8y](1, STX[i1y](c.width)); }
			else { context.lineWidth = 1; }
			this[a0y]("stx_line_chart"); context.stroke(); context.closePath();
		}
		; STXChart.prototype.headsUpHR = function () {
			var x6Z = "mmddhhmm", w88 = "hDa", z5i = "contr", D8Z = "Pi", y78 = "H7b", l48 = "Y7b", Y8Z = "q7b"; if (this[G5Z]("headsUpHR", arguments)) return; var panel = this[W1y]; if (!panel) return; var chart = panel[n48], cy = this[n58]; if (S9y4F[(W2K + Q4y)](panel[s5i], "vchart")) { var y = S9y4F[Y8Z](panel[C2Z], cy), px = S9y4F[l48](panel[O3B], panel.height), amount = panel[d5y] + S9y4F[y78](y, px); this[E0y][p8K][x1M] = STX[m28](amount); }
			else { var price = this[(S9y4F.u7Z + I4y + J6Z + l5v + G0y + e38 + D8Z + e5M + J6Z)](cy, panel); price = this[Y2v](price, panel); this[E0y][p8K][x1M] = price; }
			if (this[(z5i + B6Z + F2v)][G9v]) {
				var bar = this[K8M](this[D98]), prices = chart[g4y][bar]; if (prices) {
					if (this[p4M]) { var str = this[p4M][(l0v + U0K + w88 + q7Z)][i88](prices[U3M]); str += " " + this[p4M][A1K][i88](prices[(U3M)]); this[(j3v + r4Z + B6Z + J6Z + S9y4F.a5Z)][G9v][x1M] = str; }
					else { this[E0y][G9v][x1M] = STX[x6Z](prices[(D08 + f3y)]); }
				}
			}
			if (this[P9i]("headsUpHR", arguments)) return;
		}
		; STXChart.prototype.setCrosshairColors = function () {
			var q8K = "setCrosshairColors", s78 = "contro", J8y = "ati", F6M = "ann", S0M = "z7b", s1Z = "S7b", j4K = "G7", l2i = "ors", c68 = "air", W08 = "Cro"; return; if (this[G5Z]((S9y4F.a5Z + j23 + W08 + S9y4F.a5Z + t9y + c68 + G2K + Y33 + l2i), arguments)) return; var newClassName = C08, oldClassName = n43; if ((STXChart[G53] || S9y4F[(j4K + Q4y)](STXChart[m7M], A8Z) || S9y4F[s1Z](STXChart[m7M], z23) || S9y4F[S0M](STXChart[m7M], (k5Z + U8i + M9Z + W5M + S9y4F.t3y + S2y)) || S9y4F[(e7y + N8K + Q4y)](STXChart[m7M], (F6M + Z43 + J8y + h73)))) { newClassName = n43; oldClassName = C08; }
			if (this[E0y][K33][L68][K0M](newClassName) == -S9y4F.K3B) { STX[W7M](this[E0y][K33], newClassName, oldClassName); STX[W7M](this[(s78 + F2v)][Y73], newClassName, oldClassName); }
			this[P9i](q8K, arguments);
		}
		; STXChart.prototype.magnetize = function () {
			var T7B = "unApp", S8y = "PI", f1Z = "P3b", O68 = "eWidth", P63 = "Tick", R7v = "From", H0Z = "3b", h4y = "i3b", M28 = "j3b", n6i = "K3", w4y = "tT", C4i = "V3b", N5i = "R7b", G4y = "l7b", U0M = "b7b", W78 = "ataSe", q2y = "E7b", B3K = "s7b", T0Z = "J7b", R1M = "k7b", m3y = "T7b", Z8K = "D7b", f43 = "M7b"; this[t7K] = null; if (this[G5Z]("magnetize", arguments)) return; if (S9y4F[f43](STXChart[m7M], "annotation") && STXChart[G53]) return; if (S9y4F[Z8K](STXChart[m7M], "projection")) return; if (S9y4F[m3y](STXChart[m7M], "freeform")) return; var panel = this[W1y]; if (S9y4F[R1M](panel[s5i], panel[n48][s5i])) {
				var chart = panel[n48], tick = this[U3y](S9y4F[T0Z](STXChart[Y93], this[n48][K1Z]), chart); if (S9y4F[B3K](this[v3Z][l2M], "minute")) tick /= this[v3Z][y2Z]; if (S9y4F[q2y](tick, chart[B6K].length)) return; var prices = chart[(u4y + W78 + S9y4F.t3y)][tick]; if (S9y4F[U0M](prices, null)) return; var price = this[X5M](this[n58], panel); this[t7K] = prices[Y88]; if (S9y4F[G4y](this[v3Z][c88], (Q4y + q5y)) || S9y4F[N5i](this[v3Z][c88], "candle") || S9y4F[C4i](this[v3Z][(S9y4F.U9Z + w4y + q7Z + V5M)], "colored_bar") || S9y4F[(n6i + Q4y)](this[v3Z][c88], "hollow_candle")) {
					var fields = ["Open", (P5y), "Low", "Close"], closest = 1000000000; for (var i = 0; S9y4F[M28](i, fields.length) ; i++) {
						var fp = prices[fields[i]]; if (S9y4F[h4y](Math[F0Z](price - fp), closest)) { closest = Math[(I4y + Q4y + S9y4F.a5Z)](S9y4F[(G0y + H0Z)](price, fp)); this[t7K] = fp; }
					}
				}
				var x = this[(X8i + b73 + R7v + P63)](tick, chart), y = this[o4K](this[t7K], this[W1y]), ctx = this[n48][u28][(j1y + B6Z + U0K + K1y + P7Z + S9y4F.t3y)]; ctx.beginPath(); ctx.lineWidth = 1; var radius = S9y4F[(S9y4F.E2K + H0Z)](Math[L8y](this[v3Z][(j1y + w7B + u4y + J6Z + O68)], 8), 2); ctx.arc(x, y, radius, 0, S9y4F[f1Z](2, Math[S8y]), false); ctx.fillStyle = "#FFFFFF"; ctx.strokeStyle = "#000000"; ctx.fill(); ctx.stroke(); ctx.closePath();
			}
			this[(S9y4F.b3y + T7B + H43 + u4y)]("magnetize", arguments);
		}
		; STXChart.prototype.doDisplayCrosshairs = function () {
			var h6M = "rols", I53 = "B3b", Z1i = "sX", D3B = "ros", A0Z = "t3b", Z38 = "Typ", U1i = "h3b", N2y = "unP"; if (this[(S9y4F.b3y + N2y + O0M + K1y + a6Z + u4y)](z63, arguments)) return; if (this[a9i]) {
				if (!this[v3Z][n2v] && S9y4F[U1i](STXChart[(S9y4F.u7Z + K1y + j1y + t0Z + S9y4F.b3y + Z38 + K1y)], Z3y)) { this[D63](); }
				else if (STX[N7Z][STXChart[m7M]] && (new STX[N7Z][STXChart[m7M]])[M68]) { this[D63](); }
				else {
					if (S9y4F[A0Z](this[E0y][(j1y + D3B + Z1i)][(S9y4F.a5Z + S9y4F.t3y + q7Z + r3y)][G5v], Z3y)) {
						this[E0y][K33][q68][G5v] = Z3y; this[E0y][Y73][q68][G5v] = Z3y; this[E0y][p8K][q68][G5v] = Z3y; if (this[l1Z][V7M] && S9y4F[I53](STXChart[m7M], Z3y)) { document[D6i][q68][d0i] = H8M; }
						else { document[D6i][q68][d0i] = n2v; }
					}
					if (this[E0y][G9v]) { this[(j3v + S9y4F.t3y + h6M)][G9v][q68][G5v] = z98; }
				}
			}
			if (this[P9i](z63, arguments)) return;
		}
		; STXChart.prototype.undisplayCrosshairs = function () {
			var H8v = "y3b", K8y = "r3b"; if (this[G5Z](D63, arguments)) return; if (S9y4F[K8y](this[E0y][K33], S9y4F.o6i)) {
				if (S9y4F[H8v](this[E0y][(j1y + S9y4F.b3y + A2y + e7y)][q68][G5v], H8M)) { this[E0y][K33][q68][(G7M + S9y4F.a5Z + y8M + q7Z)] = H8M; this[E0y][Y73][(O4y + q7Z + r3y)][G5v] = H8M; this[E0y][p8K][q68][G5v] = H8M; }
			}
			if (this[a9i] && this[E0y][G9v]) { this[E0y][G9v][q68][G5v] = H8M; }
			document[D6i][q68][d0i] = Y83; if (this[P9i](D63, arguments)) return;
		}
		; STXChart.prototype.modalBegin = function () { var X8v = "modal"; this[Y4M] = X8v; this[D63](); }
		; STXChart.prototype.modalEnd = function () { this[s0M] = L9i; this[Y4M] = Z3y; this[z63](); }
		; STXChart.prototype.updateChartAccessories = function () {
			var Z3v = "b3b", c7M = "Wid", T13 = "fs", D78 = "E3b", I23 = "f3b", k8M = "tHR", u4Z = "floa"; this[h4K] = S9y4F.o6i; this[b93] = new Date()[u68](); var xy = STX[o28](this[E0y][(u4Z + k8M)][s2v]); this.controls.floatHR.style.top = (S9y4F[I23](STXChart[P93], xy[q7Z], this[E0y][p8K][M6K] / S9y4F.V3B)) + V1M; var floatDate = this[E0y][G9v]; if (floatDate) { var chart = this[W1y][n48]; floatDate[(O4y + q7Z + r3y)][K1Z] = (S9y4F[D78](this[a8y](STXChart[Y93]), (floatDate[(l53 + T13 + K1y + S9y4F.t3y + c7M + S9y4F.t3y + S9y4F.n0Z)] / S9y4F.V3B))) + V1M; floatDate[q68][C2Z] = (S9y4F[Z3v](this[n48][a18], chart[v73][(Y0i + S9y4F.t3y + t0Z + Y9Z)])) + (k5Z + P7Z); }
			this[C4y]();
		}
		; STXChart.prototype.mousemove = function (e) {
			var q33 = "l3b", A38 = "geX"; if (!e) e = event; if (!e[X3y]) { e[(k5Z + I4y + A38)] = e[T88] + document[D6i][f4K] + document[v5M][f4K]; e[j5Z] = e[O3M] + document[D6i][Q18] + document[v5M][Q18]; }
			STXChart[Y93] = e[X3y]; STXChart[P93] = e[j5Z]; if (this[G5Z](g2v, arguments)) return; if (!this[a9i]) return; if (S9y4F[q33](this[Y4M], Z3y)) return; this[l8v](e[X3y], e[j5Z]); if (this[P9i](g2v, arguments)) return;
		}
		; STXChart.prototype.setResizeTimer = function (ms) {
			var Z28 = "eTim", k23 = "resi", c28 = "meout", E5y = "esiz", N3M = "resizeTimeout"; this[x3y] = ms; function closure(self) {
				return function () {
					var T9M = "V5", H1v = "R3b"; if (!self[n48].canvas) return; if (!STX[H1K]) {
						if (S9y4F[H1v](self[n48].canvas.height, Math[z0Z](self[j68] * self[n48][t28][M03])) || S9y4F[(T9M + j1y)](self[n48].canvas.width, Math[z0Z](self[j68] * self[n48][t28][D2v]))) { self[k8y](); return; }
					}
				}
				;
			}
			; if (ms) { if (this[N3M]) window[Z2Z](this[N3M]); this[(S9y4F.b3y + E5y + w3v + c28)] = window[w5M](closure(this), ms); }
			else { if (this[N3M]) window[Z2Z](this[N3M]); this[(k23 + E8Z + Z28 + S13 + r2v)] = null; }
		}
		; STXChart.prototype.mousemoveinner = function (epX, epY) {
			var H0v = "K0c", N7M = "V0c", T4i = "eDrawin", I1K = "move", a8i = "ssar", G28 = "fNe", f2y = "ju", O28 = "R9c", l7Z = "Line", R9v = "l9c", k63 = "updateChartAccessories", c2i = "b9c", p7v = "E9c", X2v = "side", w4K = "Colors", C7i = "etCrosshai", Q3Z = "s9c", E43 = "ossh", a6y = "requestAnimationFrame", b28 = "sAnd", C8y = "useAnimation", L7i = "J9c", o5K = "k9c", r08 = "pre", e03 = "spac", Y6i = "T9c", F8Z = "D9c", B0M = "shift", D9M = "M9c", K83 = "X9c", x3v = "z9c", o1K = "S9c", g7Z = "eWi", A6y = "G9c", T83 = "H9c", i8y = "Y9c", B8K = "q9c", J8i = "xTicks", T4v = "o6c", h4i = "u6c", W3Z = "v6c", n88 = "e6c", c4Z = "d6c", J8M = "W6c", Q8M = "I6c", s0y = "w6c", z2i = "U6c", t1K = "6c", f8K = "Q6c", E58 = "N6c", d0Z = "tCan", i4y = "Z6c", g8M = "a6c", C9v = "n6c", O03 = "grabMode", i2K = "C6c", o9K = "L6c", k1y = "c6c", k2M = "g5c", a2i = "oken", V6y = "ceB", x7y = "O5c", v53 = "p5c", k8i = "Star", k1M = "x5c", i58 = "tartX", d8v = "f5c", i03 = "rla", F23 = "y5c", o3y = "sshai", B5M = "yC", U53 = "dis", B78 = "r5c", k2y = "overYAxis", K5v = "B5c", W4K = "t5c", p43 = "overXAxis", C7M = "h5c", i0y = "P5c", L0K = "A5c", l4v = "i5c", j93 = "rrentPane", H2i = "urren", z5y = "j5c", H9K = "K5c"; if (!this[(j1y + i2i + S9y4F.t3y)].canvas) return; if (!STX[H1K]) {
				if (S9y4F[H9K](this[n48].canvas.height, Math[(L9v + S9y4F.b3y)](this[j68] * this[(r28 + q5y + S9y4F.t3y)][t28][M03])) || S9y4F[z5y](this[n48].canvas.width, Math[z0Z](this[j68] * this[n48][(R48 + a6Z + S9y4F.t3y + I4y + E0M)][D2v]))) { this[k8y](); return; }
			}
			if (this[G5Z]("mousemoveinner", arguments)) return; STXChart[Y93] = epX; STXChart[P93] = epY; var cy = this[n58] = this[u2y](STXChart[P93]), cx = this[D98] = this[a8y](STXChart[Y93]); this[W1y] = this[s33](cy); if (!this[(j1y + H2i + p1v + C6Z)]) this[W1y] = this[n48][v73]; if (!this[(m68 + j93 + J6Z)]) return; var chart = this[W1y][n48]; if (chart[B6K]) { this[o43] = S9y4F[l4v](this[U3y](this[a8y](STXChart[Y93]), chart), this[v3Z][y2Z]); this[B13] = this[p5y](this[W1y], this[o43], this[X5M](cy, this[(j1y + E9K + a6Z + S9y4F.t3y + F6y + I4y + a6Z + K1y + J6Z)])); }
			if (S9y4F[(G0y + b8K + j1y)](STXChart[Y93], this[n48][K1Z]) && S9y4F[L0K](STXChart[Y93], this[n48][j7y]) && S9y4F[i0y](STXChart[P93], this.chart.top) && S9y4F[C7M](STXChart[P93], this[n48][C2Z])) { STXChart[L13] = true; }
			else { STXChart[L13] = false; }
			this[p43] = S9y4F[W4K](STXChart[P93], this.chart.top + this[n48][v73][n5K][C2Z]) && S9y4F[(K5v)](STXChart[P93], this.chart.top + this[n48][v73][C2Z]) && STXChart[L13]; this[k2y] = S9y4F[B78](STXChart[Y93], this[n48][L0Z]) && STXChart[L13]; if (this[p43] || this[k2y] || (!STXChart[L13] && !this[Q93])) { document[D6i][q68][(f4y + u9y + S9y4F.b3y)] = "auto"; this[D63](); if (!this[p43] && !this[k2y]) return; }
			if (!this[(U53 + k5Z + C7Z + B5M + U8i + o3y + X2i)] && S9y4F[F23](STXChart[n8Z], null)) { document[D6i][q68][d0i] = "auto"; this[D63](); return; }
			if (this[Q93] && !STXChart[n8Z]) {
				if (this[c3v]) {
					STX[x4y](this[n48][u28], this); this[c3v] = false; for (var n in this[(B6Z + f8v + i03 + U7i)]) { this[(B6Z + S9y4F.u7Z + K1y + i03 + q7Z + S9y4F.a5Z)][n][L88] = false; }
					for (var n in chart[B9i]) { chart[B9i][n][L88] = false; }
					this[Y6Z]();
				}
				if (this[l1Z][V7M] && S9y4F[d8v](STXChart[m7M], "")) { STX[x4y](this[(j1y + k5i)][u28], this); }
				if (this[(A4Z + S9y4F.b3y + K4y + i58)] == -1) { this[V8y] = STXChart[Y93]; this[h1v] = chart[i2v]; }
				if (this[F8y] == -1) { this[F8y] = STXChart[P93]; this[K1v] = chart[v73][n5K][i2v]; }
				var dx = S9y4F[k1M](STXChart[Y93], this[(O1K + Q4y + k8i + S9y4F.t3y + e7y)]), dy = S9y4F[v53](STXChart[P93], this[F8y]); if (S9y4F[x7y](Math[F0Z](dy), this[N9i])) { if (!this[(q7Z + l3B + Y33 + K1y + S9y4F.b3y + I4y + a6Z + V6y + S9y4F.b3y + a2i)]) dy = 0; }
				else { this[I98] = true; }
				if (S9y4F[k2M](dx, 0) && S9y4F[k1y](dy, 0)) return; if (S9y4F[o9K](Math[F0Z](dx) + Math[F0Z](dy), 5)) this[Y4i] = true; if (S9y4F[i2K](this[O03], "pan") && (S9y4F[C9v](this[O03], "zoom") || this[z6v] || this[p43] || this[k2y])) {
					this[O03] = "zoom"; if (this[p43]) dy = 0; if (this[k2y]) dx = 0; var push = S9y4F[g8M](dx, 25), centerMe = true; if (S9y4F[i4y](chart[i2v], chart[H58])) centerMe = false; var newCandleWidth = this[(f4M + I4y + Q4y + U3B + S9y4F.t3y + I4y + S9y4F.b3y + d0Z + i4M + K1y + Y3y + S9y4F.W0Z + M9M + S9y4F.n0Z)] + push; if (S9y4F[E58](newCandleWidth, .25)) newCandleWidth = .25; var pct = S9y4F[f8K]((this[v3Z][C9i] - newCandleWidth), this[v3Z][C9i]); if (S9y4F[(Y9Z + t1K)](pct, .1)) { newCandleWidth = S9y4F[z2i](this[(C7Z + q7Z + B6Z + r2v)][C9i], .9); }
					else if (pct < -.1) { newCandleWidth = S9y4F[s0y](this[v3Z][C9i], 1.1); }
					if (STX[Q7v]) { if (S9y4F[Q8M](Math[E08]((this[n48].width / this[v3Z][C9i]) - .499) - 1, STXChart[y48]) && S9y4F[J8M](Math[E08]((this[n48].width / newCandleWidth) - .499) - 1, STXChart[y48])) return; }
					if (this[j3M]) { var x = this[a8y](this[j3M]), tick = this[U3y](x, chart); this[v3Z][C9i] = newCandleWidth; if (S9y4F[c4Z](this[v3Z][C9i], 0)) this[v3Z][C9i] = 1; this[W1y][(j1y + w9M + S9y4F.b3y + S9y4F.t3y)][H58] = Math[E08](S9y4F[n88]((this[(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y)].width / this[v3Z][C9i]), .499)); var newTick = this[(S9y4F.t3y + S9y4F.W0Z + b18 + G0y + S9y4F.b3y + B6Z + m4K + K1y + J6Z)](x, chart); chart[i2v] += Math[z0Z](S9y4F[W3Z]((newTick - tick), this[(J6Z + D0y + M23 + S9y4F.t3y)][y2Z])); }
					else if (centerMe) { this[v3Z][(u4K + J6Z + K1y + Y3y + S9y4F.W0Z + S8K)] = newCandleWidth; if (S9y4F[h4i](this[v3Z][C9i], 0)) this[v3Z][C9i] = 1; var center = S9y4F[T4v](chart[i2v], chart[(i8v + J8i)] / 2); chart[H58] = Math[E08](S9y4F[B8K]((this[n48].width / this[v3Z][C9i]), .499)); var newCenter = (S9y4F[i8y](chart[i2v], chart[H58] / 2)); chart[i2v] += Math[E08](S9y4F[T83](center, newCenter)); }
					else { this[v3Z][C9i] = newCandleWidth; if (S9y4F[A6y](this[v3Z][C9i], 0)) this[v3Z][(z88 + a6Z + u4y + J6Z + g7Z + u4y + S9y4F.t3y + S9y4F.n0Z)] = 1; chart[H58] = Math[E08](S9y4F[o1K]((this[n48].width / this[v3Z][C9i]), .499)); var wsInTicks = Math[E08](S9y4F[x3v](this[l1Z][y1v], this[(C7Z + q7Z + M23 + S9y4F.t3y)][C9i])); chart[i2v] = S9y4F[K83](chart[H58], wsInTicks); }
					this[v3Z][F83] = null; var yAxis = chart[v73][n5K]; yAxis[f08] = this[U98] + dy;
				}
				else {
					this[O03] = "pan"; var push = Math[E08](S9y4F[D9M](dx, this[v3Z][C9i])); if (this[B0M]) push *= 5; chart[i2v] = this[h1v] + push; if (S9y4F[F8Z](chart[i2v], 1)) chart[i2v] = 1; if (S9y4F[Y6i](chart[i2v], chart[H58])) { this[l1Z][(k7Z + S9y4F.n0Z + Z2i + K1y + e03 + K1y)] = 30; }
					else { this[(r08 + q4Z + K1y + S9y4F.b3y + K1y + T53 + S9y4F.a5Z)][y1v] = S9y4F[o5K]((chart[H58] - chart[i2v]), this[v3Z][C9i]); }
					if (S9y4F[L7i](this[(f4y + S9y4F.b3y + K1y + a6Z + S9y4F.t3y + h5y)][s5i], chart[s5i])) { this[n48][v73][n5K][i2v] = this[K1v] + dy; }
				}
				var clsrFunc = function (stx) {
					return function () { stx[(u4y + A0i + k7Z)](); }
					;
				}
				; if ((STXChart[C8y] || STX[(S9y4F.W0Z + b28 + S9y4F.b3y + M83 + u4y)]) && window[a6y]) window[a6y](clsrFunc(this)); else this[c2y](); if (this[g23]) { STX[x4y](this[(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y)][u28], this); this[g23][A9i](this[n48][u28][U83]); this[g23][(v5v + I4y + i2y + S9y4F.b3y + K1y)](); }
				this[D63](); return;
			}
			else { this[O03] = ""; }
			if (this[p43] || this[k2y]) return; var tick = this[U3y](this[a8y](STXChart[(u98 + E43 + I4y + S9y4F.W0Z + S9y4F.b3y + e7y)]), chart); tick /= this[v3Z][y2Z]; this[E0y][K33][q68][(r3y + q4Z + S9y4F.t3y)] = (S9y4F[Q3Z](this[(k5Z + M1i + O23 + S9y4F.b3y + E73 + l3B + S9y4F.W0Z + j1y + d9Z)](tick, chart), .5)) + (k5Z + P7Z); this.controls.crossY.style.top = this[u2y](STXChart[P93]) + "px"; this[(S9y4F.a5Z + C7i + S9y4F.b3y + w4K)](); if (STXChart[(G7i + X2v + G2K + i2i + S9y4F.t3y)] && S9y4F[p7v](STXChart[n8Z], null)) {
				this[z63](); if (S9y4F[c2i](this[h4K], null)) clearTimeout(this[h4K]); if (STXChart[G53]) { this[k63](); }
				else {
					if (S9y4F[R9v](new Date()[u68]() - this[b93], 100)) this[k63](); this[h4K] = setTimeout((function (stx) {
						return function () { stx[k63](); }
						;
					}
					)(this), 10);
				}
			}
			else { this[D63](); document[D6i][q68][d0i] = "auto"; }
			if (STXChart[(u4y + A0i + k7Z + S9y4F.W0Z + Y9K + l7Z)]) {
				if (this[g23]) {
					var panel = this[(k5Z + w7B + K1y + J6Z + S9y4F.a5Z)][this[g23][z4M]], value = this[p5y](panel, this[o43], this[o18](this[u2y](STXChart[P93]), panel)); if (this[l1Z][V7M] && this[t7K] && S9y4F[O28](panel[s5i], panel[n48][s5i])) { value = this[(I4y + u4y + f2y + S9y4F.a5Z + m9y + G28 + j1y + K1y + a8i + q7Z)](panel, this[o43], this[t7K]); }
					STX[x4y](this[n48][u28], this); this[g23][I1K](this[(j1y + S9y4F.n0Z + I4y + K2i)][u28][U83], this[o43], value); if (this[g23][h03]) this[(I4y + j1y + i6Z + S9y4F.u7Z + T4i + A4Z)][h03]();
				}
			}
			else if (S9y4F[N7M](STXChart[n8Z], null)) { this[e0y](); this[d78](); }
			else if (STXChart[(G7i + S9y4F.a5Z + D58 + K1y + G2K + S9y4F.n0Z + q5y + S9y4F.t3y)]) { this[c98](); }
			if (this[l1Z][V7M] && S9y4F[H0v](STXChart[m7M], "")) { if (!STXChart[G53] && !this[c3v]) STX[x4y](this[n48][u28]); this[c43](); }
			if (this[P9i]("mousemoveinner", arguments)) return;
		}
		; STXChart.prototype.findHighlights = function (isTap) {
			var P08 = "Mea", f1i = "hig", H4v = "Z4c", A5i = "a4c", G8i = "rlays", R63 = "n4c", V7Z = "C4c", f88 = "L4c", r9Z = "g0c", L03 = "O0c", c3B = "ght", V2M = "0c", c5y = "y0c", l9y = "tP", j2K = "r0c", Q9M = "lays", L5v = "isHighlighted", e98 = "ment", C8i = "taSeg", m08 = "t0c", Y0K = "prev", V7y = "intersected", p5v = "h0c", k5M = "P0c", b08 = "A0c", B7v = "rio", x8v = "F0c", I4i = "i0c", q0K = "j0c", K48 = "gnet", radius = 10; if (isTap) radius = 30; var cy = this[n58], cx = this[D98]; if (!this[W1y]) return; var chart = this[W1y][(j1y + S9y4F.n0Z + q5y + S9y4F.t3y)]; this[c3v] = false; if (this[l1Z][(i8v + K48)] && S9y4F[q0K](STXChart[m7M], "")) { STX[x4y](this[n48][u28], this); }
			var somethingChanged = false, drawingToMeasure = null, box = { x0: S9y4F[I4i](this[U3y](cx - radius, chart), this[v3Z][y2Z]), x1: S9y4F[x8v](this[U3y](cx + radius, chart), this[v3Z][(k5Z + K1y + B7v + u4y + S9y4F.W0Z + j1y + S9y4F.W0Z + S9y4F.t3y + q7Z)]), y0: this[o18](S9y4F[b08](cy, radius), this[W1y]), y1: this[o18](cy + radius, this[W1y]) }
			; for (var i = 0; S9y4F[k5M](i, this[L8M].length) ; i++) {
				var drawing = this[L8M][i]; if (drawing[d3M]) continue; var highlightMe = (S9y4F[p5v](drawing[z4M], this[W1y][s5i])); highlightMe = highlightMe && drawing[V7y](this[o43], this[B13], box); if (highlightMe) {
					if (drawing[L88](true)) { drawingToMeasure = drawing; somethingChanged = true; }
					this[c3v] = true;
				}
				else { if (drawing[L88](false)) somethingChanged = true; }
			}
			if (somethingChanged) { this[c2y](); this[Y6Z]("", "", true); if (drawingToMeasure) drawingToMeasure[h03](); }
			var first = false; for (var n in this[W33]) { var o = this[W33][n]; o[Y0K] = o[L88]; o[L88] = false; }
			for (var n in chart[B9i]) { var series = chart[B9i][n]; series[Y0K] = series[L88]; series[L88] = false; }
			var bar = this[K8M](cx); if (S9y4F[m08](bar, chart[(u4y + I4y + C8i + e98)].length)) {
				for (var n in this[W33]) {
					var o = this[W33][n]; if (S9y4F[(a5M + j1y)](o[v73], this[W1y][s5i])) continue; if (o[J2K][L5v] && o[J2K][L5v](this, cx, cy)) { o[L88] = true; this[c3v] = true; continue; }
					var quote = chart[q3B][bar]; if (!quote) continue; for (var out in this[(B6Z + Q8Z + Q9M)][n][G3K]) {
						var val = quote[out], y = 0; if (S9y4F[j2K](this[W1y][s5i], chart[s5i])) { y = this[o4K](val, this[(f4y + S9i + a6Z + p1v + a6Z + K1y + J6Z)]); }
						else { y = this[o4K](val, this[(f4y + S9i + a6Z + l9y + N6M + J6Z)]); }
						if (S9y4F[c5y](cy - radius, y) && S9y4F[(q4Z + V2M)](cy + radius, y)) { o[L88] = true; this[c3v] = true; break; }
					}
				}
				for (var n in chart[B9i]) {
					var series = chart[B9i][n], y = series[S78][bar]; if (S9y4F[(P7Z + y6K + j1y)](cy - radius, y) && S9y4F[(k5Z + V2M)](cy + radius, y)) { series[L88] = true; this[(I4y + a6Z + q7Z + V4y + S9y4F.W0Z + h63 + s5Z + c3B + a83)] = true; }
					else if (series[b2v] && S9y4F[L03](bar, 0)) {
						var py = series[S78][S9y4F[r9Z](bar, 1)]; if ((S9y4F[(j1y + T1Z)](cy, y) && S9y4F[f88](cy, py)) || (S9y4F[V7Z](cy, y) && S9y4F[R63](cy, py))) { series[L88] = true; this[c3v] = true; }
					}
				}
			}
			for (var n in this[W33]) {
				var o = this[(K23 + K1y + G8i)][n]; if (S9y4F[A5i](o[(Y0K)], o[L88])) {
					this[c2y](); if (o[L88]) { this[c3v] = true; this[Y6Z](o[s5i]); }
					break;
				}
			}
			for (var n in chart[B9i]) {
				var series = chart[B9i][n]; if (S9y4F[H4v](series[Y0K], series[(f1i + S9y4F.n0Z + d03 + X18)])) {
					this[c2y](); if (series[L88]) { this[c3v] = true; this[Y6Z](series[G5v], series[w6K][J2y]); }
					break;
				}
			}
			if (!this[c3v]) { this[(S9y4F.a5Z + j23 + P08 + i2y + S9y4F.b3y + K1y)](); }
		}
		; STXChart.prototype.positionSticky = function (m) { var G43 = "offsetWidth", A18 = "h4c", r03 = "N4c", top = Math[L8y](S9y4F[(r03)](this[u2y](STXChart[P93]), m[M6K], T2Z), S9y4F.Y3B), right = Math[d5y](S9y4F[A18](this[n48][(j1y + O2M + g5y + n3y + S8K)], (this[a8y](STXChart[Y93]) - R2Z)), S9y4F[(S9y4F.t3y + Z7K + j1y)](this[n48][e5Z], m[G43])); m.style.top = top + V1M; m[q68][L0Z] = right + V1M; }
		; STXChart.prototype.displaySticky = function (message, backgroundColor, forceShow) {
			var d2i = "uchDevice", o0M = "positionSticky", j5y = "inli", E3Z = "tyle", T9v = "olor", J3K = "ndC", G1M = "f4c", G7K = "y4c", x7M = "r4c", R9M = "B4c", m = this[E0y][B83]; if (!m) return; var mi = m[o8K][S9y4F.Y3B]; if (!mi) return; var overlayTrashCan = m[o8K][S9y4F.K3B], mouseDeleteInstructions = m[o8K][S9y4F.V3B]; if (!forceShow && (S9y4F[R9M](message, S9y4F.o6i) || S9y4F[x7M](message, Z3y))) {
				mi[x1M] = Z3y; m[q68][G5v] = H8M; if (STX[I5M] && overlayTrashCan) { overlayTrashCan[q68][G5v] = H8M; }
				else if (!STX[I5M] && mouseDeleteInstructions) { mouseDeleteInstructions[q68][G5v] = H8M; }
			}
			else {
				if (S9y4F[G7K](message, S9y4F.o6i)) message = Z3y; if (forceShow && S9y4F[G1M](message, Z3y)) { mi[q68][(t8i + b18 + f4M + M23 + J3K + T9v)] = Z3y; mi[q68][J2y] = Z3y; mi[(j33 + r3y)][G5v] = H8M; }
				else if (backgroundColor) { mi[q68][r8Z] = backgroundColor; mi[q68][J2y] = STX[N2v](backgroundColor); mi[q68][G5v] = X1v; }
				else { mi[q68][r8Z] = Z3y; mi[q68][J2y] = Z3y; mi[q68][G5v] = X1v; }
				mi[x1M] = message; m[(S9y4F.a5Z + E3Z)][(u4y + S9y4F.W0Z + R4y + C7Z + q7Z)] = (j5y + a6Z + K1y + r5K + Q4y + J6Z + B6Z + j1y + d9Z); this[o0M](m); if (STX[I5M] && overlayTrashCan) { overlayTrashCan[q68][G5v] = X1v; }
				else if (!STX[(S9y4F.t3y + B6Z + d2i)] && mouseDeleteInstructions) { mouseDeleteInstructions[q68][G5v] = z98; }
			}
		}
		; STXChart.prototype.setMeasure = function (price1, price2, tick1, tick2, hover) {
			var I8Z = "ky", Y5Z = "nSt", B8Z = "cti", a5i = "measureLit", Y7Z = "h1c", F3M = "lbac", T8K = "onC", L4i = "sla", E9y = "Bars", B1K = "P1c", H9i = "A1c", J4K = ")", D03 = " (", k8K = "F1c", d18 = "n1c", L2i = "C1c", G8K = "L1c", w1M = "c1c", X73 = "g4c", v8K = "O4c", I3v = "numbers", x83 = "p4c", b2y = "measureUnlit", l8K = "Na", O6Z = "mM"; if (this[G5Z](M73, arguments)) return; var m = $$((O6Z + K1y + I4y + S9y4F.a5Z + B3y + S9y4F.b3y + K1y)); if (!price1) { if (m && S9y4F[(P7Z + T1Z)](m[(j1y + J6Z + I4y + S9y4F.a5Z + S9y4F.a5Z + l8K + v5v)], b2y)) m[L68] = b2y; }
			else {
				var distance = S9y4F[x83](Math[E08](Math[F0Z](price1 - price2) * this[n48][X3K]), this[(S9y4F.U9Z + S9y4F.t3y)][X3K]), message = Z3y; if (this[p4M]) { message += this[p4M][I3v][i88](distance); }
				else { message += distance; }
				var pct = S9y4F[(v8K)]((price2 - price1), price1); if (S9y4F[X73](Math[F0Z](pct), M0Z)) { pct = Math[E08](S9y4F[w1M](pct, z8M)); }
				else if (S9y4F[G8K](Math[F0Z](pct), o58)) { pct = S9y4F[L2i](Math[E08](pct * B2i), W1Z); }
				else { pct = S9y4F[d18](Math[E08](pct * G8Z), z8M); }
				if (this[p4M]) { pct = this[p4M][a7K][i88](S9y4F[k8K](pct, z8M)); }
				else { pct = pct + D0K; }
				message += D03 + pct + J4K; var ticks = Math[F0Z](S9y4F[H9i](tick2, tick1)); if (S9y4F[B1K](this[v3Z][l2M], h9i)) ticks /= this[v3Z][y2Z]; ticks = Math[E08](ticks) + S9y4F.K3B; var barsStr = E9y; if (this[W2v]) barsStr = this[(S9y4F.t3y + S9y4F.b3y + I4y + a6Z + L4i + i6Z + T8K + I4y + J6Z + F3M + d9Z)](barsStr); message += V2v + ticks + V2v + barsStr; if (m) { if (S9y4F[Y7Z](m[L68], a5i)) m[L68] = a5i; m[x1M] = message; }
			}
			if (this[(I4y + B8Z + f8v + U9i + k7Z + S9y4F.W0Z + a6Z + A4Z)]) return; m = this[E0y][B83]; if (hover) {
				m[q68][G5v] = X1v; m[o8K][S9y4F.Y3B][q68][G5v] = X1v; if (price1) {
					m[o8K][S9y4F.Y3B][x1M] = message; if (STX[I5M]) { m[o8K][S9y4F.K3B][q68][G5v] = X1v; if (m[o8K][S9y4F.V3B]) m[(j1y + y5M + J6Z + u4y + S9y4F.b3y + K1y + a6Z)][S9y4F.V3B][q68][G5v] = H8M; }
					else { m[o8K][S9y4F.K3B][q68][G5v] = H8M; if (m[o8K][S9y4F.V3B]) m[o8K][S9y4F.V3B][q68][G5v] = z98; }
				}
				this[(k5Z + B6Z + S9y4F.a5Z + S9y4F.W0Z + i6Z + B6Z + Y5Z + S9y4F.W0Z + j1y + I8Z)](m);
			}
			else { m[q68][G5v] = H8M; m[o8K][S9y4F.Y3B][x1M] = Z3y; }
		}
		; STXChart.prototype.drawTemporaryPanel = function () {
			var w3M = "B1c", n1i = "stx_panel_drag", a0i = "t1c"; STX[x4y](this[n48][u28], this); var y = S9y4F[a0i](STXChart[P93], this.chart.top); this[h0i](S9y4F.Y3B, W1Z, y, y, this[j2M](n1i), K5K, this[n48][u28][U83], j8Z, {}
			); STXChart.resizingPanel.handle.style.top = (S9y4F[w3M](y, STXChart[(d1M + S9y4F.W0Z + E8Z + S9y4F.W0Z + Y9K + Y1Z + C6Z)][f0v][M6K] / S9y4F.V3B)) + (k5Z + P7Z);
		}
		; STXChart.prototype.highlightPanel = function (panel) { var O6K = "stx_panel_highlight"; STX[x4y](this[n48][u28], this); this[h0i](S9y4F.Y3B, W1Z, panel.top, panel.top, this[j2M](O6K), K5K, this[n48][u28][(j1y + B6Z + U0K + d93 + S9y4F.t3y)], j8Z); panel[l83] = L9i; }
		; STXChart.prototype.unhighlightPanel = function (panel) { STX[x4y](this[(r63 + K2i)][u28], this); panel[l83] = j8Z; }
		; STXChart.prototype.setTrashCan = function () {
			var E78 = "kO", D5Z = "y1c", L8v = "r1c"; if (STX[I5M]) {
				var m = this[E0y][B83]; if (m) { m[q68][(V5K + D0y)] = X1v; m[(j1y + S9y4F.n0Z + S9y4F.W0Z + i3y + S9y4F.b3y + H43)][S9y4F.Y3B][q68][G5v] = H8M; m[o8K][S9y4F.K3B][q68][G5v] = X1v; if (m[o8K][S9y4F.V3B]) m[o8K][S9y4F.V3B][q68][G5v] = H8M; m.style.top = (S9y4F[L8v](this[u2y](STXChart[P93]), T2Z)) + V1M; m[q68][L0Z] = S9y4F[D5Z](this[n48][e5Z], (this[(Q4y + z2y + E78 + v2y)](STXChart[(u98 + A2y + S9y4F.n0Z + I4y + S9y4F.W0Z + S9y4F.b3y + e7y)]) - R2Z), V1M); }
			}
		}
		; STXChart.prototype.pixelFromBar = function (bar) { var o33 = "E1c", O7B = "s1c", x = Math[E08]((S9y4F[O7B](bar, this[v3Z][C9i])) + S9y4F[o33](this[v3Z][C9i], S9y4F.o7B)); return x; }
		; STXChart.prototype.barFromPixel = function (x) { var N8M = "leWi", G83 = "b1c"; return Math[z0Z](S9y4F[G83](x, this[v3Z][(Z98 + u4y + N8M + u4y + S9y4F.t3y + S9y4F.n0Z)])); }
		; STXChart.prototype.tickFromPixel = function (x, chart) { var k83 = "R1c", v4M = "l1c"; if (!chart) chart = this[n48]; var left = S9y4F[v4M](chart[(u4y + o1y + j23)].length, chart[i2v]), tick = Math[E08](S9y4F[k83](((x + (left * this[(J6Z + D0y + B6Z + B3y + S9y4F.t3y)][C9i])) / this[(J6v + b0v)][C9i]), .499)); tick *= this[(C7Z + q7Z + M23 + S9y4F.t3y)][y2Z]; return tick; }
		; STXChart.prototype.pixelFromTick = function (tick, chart) { var T1i = "V2c"; if (!chart) chart = this[n48]; return S9y4F[T1i]((tick - chart[B6K].length + chart[i2v]), this[v3Z][C9i]) + this[O1M]; }
		; STXChart.prototype.pixelFromDate = function (date, chart) { return this[x8Z](this[x4K](date, chart), chart); }
		; STXChart.prototype.priceFromPixel = function (y, panel) {
			var E4y = "F2c", W4Z = "i2c", c5M = "j2c"; if (!panel) panel = this[n48][v73]; var chart = panel[n48], yAxis = panel[n5K]; y = S9y4F[(c9y + S9y4F.l5K + j1y)](yAxis[C2Z], y); var price = yAxis[W58] + (S9y4F[c5M](y, yAxis[S4y])); price = S9y4F[W4Z](Math[E08](price * chart[X3K]), chart[X3K]); if (yAxis[x4i]) { var logPrice = yAxis[R5v] + (S9y4F[E4y](y, yAxis[O5v], yAxis.height)); price = Math[E5v](10, logPrice); }
			return price;
		}
		; STXChart.prototype.valueFromPixel = function (y, panel) { if (!panel) panel = this[s33](y); var p = this[w0K](y, panel); return p; }
		; STXChart.prototype.valueFromPixelUntransform = function (y, panel) {
			var m33 = "X2c", U4v = "last", s3y = "z2c"; if (!panel) panel = this[s33](y); if (!panel) {
				if (S9y4F[s3y](y, S9y4F.Y3B)) { panel = this[w2K][STX[(q4Z + S9y4F.W0Z + S9y4F.b3y + S9y4F.a5Z + S9y4F.t3y)](this[(k5Z + I4y + a6Z + S68)])]; }
				else { panel = this[w2K][STX[U4v](this[w2K])]; }
			}
			var p = this[w0K](y, panel); if (panel[n48][k3y] && S9y4F[m33](panel[s5i], panel[n48][s5i])) { p = panel[n48][k3y](this, panel[n48], p); }
			return p;
		}
		; STXChart.prototype.pixelFromPriceTransform = function (price, panel) { if (panel[n48][X7B]) price = panel[n48][X7B](this, panel[n48], price); return this[o4K](price, panel); }
		; STXChart.prototype.pixelFromPrice = function (price, panel) {
			var x3B = "k2c", K98 = "T2c", X5i = "LN1", t1i = "D2c", X2y = "miLog", g1K = "M2c"; if (!panel) panel = this[n48][v73]; var yAxis = panel[n5K], y = S9y4F[g1K]((yAxis[V58] - price), yAxis[S4y]); if (yAxis[(S9y4F.a5Z + K1y + X2y)]) { var logPrice = S9y4F[t1i](Math[e48](price), Math[(X5i + y6K)]); if (S9y4F[K98](price, 0)) logPrice = 0; var height = yAxis.height; y = S9y4F[x3B](height, height * (logPrice - yAxis[R5v]) / yAxis[O5v]); }
			y += yAxis.top; return y;
		}
		; STXChart.prototype.pixelFromValueAdjusted = function (panel, tick, value) {
			var D53 = "E2c", Q3y = "s2c", K08 = "J2"; if (this[v3Z][P8v] || !this[(j1y + w9M + K2i + S9y4F.a5Z)][panel[s5i]]) return this[B98](value, panel); var a = Math[E08](tick); if (S9y4F[(K08 + j1y)](a, 0) && S9y4F[Q3y](a, panel[n48][B6K].length) && (ratio = panel[n48][(u4y + w5y + I4y + U3B + j23)][a][X3v])) { return this[B98](S9y4F[D53](value, ratio), panel); }
			return this[B98](value, panel);
		}
		; STXChart.prototype.adjustIfNecessary = function (panel, tick, value) {
			var D7M = "R2c", X13 = "l2c", G1K = "b2c"; if (this[v3Z][P8v]) return value; if (!panel || !this[M18][panel[s5i]]) return value; var a = Math[E08](tick); if (S9y4F[G1K](a, 0) && S9y4F[X13](a, panel[n48][B6K].length) && (ratio = panel[n48][B6K][a][X3v])) { return S9y4F[D7M](value, ratio); }
			return value;
		}
		; STXChart.prototype.setTransform = function (chart, transformFunction, untransformFunction) { chart[X7B] = transformFunction; chart[k3y] = untransformFunction; }
		; STXChart.prototype.unsetTransform = function (chart) {
			var L3Z = "V8c"; delete chart[X7B]; delete chart[k3y]; for (var i = 0; S9y4F[L3Z](i, chart[B6K].length) ; i++) { chart[B6K][i].transform = null; }
		}
		; STXChart.prototype.undo = function () {
			var P2i = "acti"; if (this[G5Z](q5K, arguments)) return; if (this[g23]) { this[(P2i + S9y4F.u7Z + K1y + g9y + S9y4F.b3y + I4y + K7M + Y9K)].abort(); this[g23] = S9y4F.o6i; STX[x4y](this[n48][u28], this); this[c2y](); STX[W7M](this[E0y][K33], C08, n43); STX[W7M](this[E0y][Y73], C08, n43); STXChart[G53] = j8Z; }
			if (this[P9i](q5K, arguments)) return;
		}
		; STXChart.prototype.undoStamp = function () { var R4M = "shallowClone", p78 = "mps", J7v = "undoSta"; this[(J7v + p78)][e8Z](STX[R4M](this[L8M])); }
		; STXChart.prototype.undoLast = function () {
			var x2Z = "undoStamps"; if (this[g23]) { this[q5K](); }
			else {
				if (this[x2Z].length) { this[L8M] = this[x2Z][s3Z](); this[c2y](); }
			}
		}
		; STXChart.prototype.addDrawing = function (drawing) { var A4M = "doStamp"; this[(n0v + A4M)](); this[L8M][e8Z](drawing); }
		; STXChart.prototype.plotLine = function (x0, x1, y0, y1, color, type, context, confineToPanel, parameters) {
			var d4v = "b3c", J38 = "E3c", I0Z = "3c", H7M = "J3c", h6Z = "k3c", F4M = "T3c", R6i = "D3c", S1y = "M3c", A3M = "X3c", z7Z = "z3c", t1M = "S3c", b3K = "G3c", l3v = "H3c", j3Z = "Y3c", c48 = "q3c", D7K = "o7c", Y23 = "u7c", X5K = "v7c", H5Z = "e7c", k3B = "d7c", v83 = "W7c", k0Z = "I7", q7i = "w7c", m88 = "U7c", s0i = "m7c", T6K = "Q7c", T5i = "N7c", F1v = "7c", k4v = "a7c", E0Z = "n7c", j2v = "C7c", l2v = "L7c", V2K = "c7c", S93 = "g8", I6i = "O8c", t3K = "p8c", A2K = "x8", E2i = "y8c", I7M = "r8c", U7Z = "B8c", Z5K = "h8c", a33 = "P8c", S33 = "A8c", d43 = "F8c", B0i = "i8c", I9K = "j8c", N13 = "K8c"; if (!parameters) parameters = {}
			; if (S9y4F[N13](parameters[U58], "none")) return; if (S9y4F[I9K](confineToPanel, true)) confineToPanel = this[n48][(k5Z + I4y + a6Z + b73)]; if (S9y4F[B0i](context, null) || typeof (context) == "undefined") context = this[n48][U83]; if (isNaN(x0) || isNaN(x1) || isNaN(y0) || isNaN(y1)) { return; }
			var edgeTop = 0, edgeBottom = this[n48][a18], edgeLeft = 0, edgeRight = this[n48].width; if (confineToPanel) { edgeBottom = confineToPanel[n5K][C2Z]; edgeTop = confineToPanel.yAxis.top; }
			if (S9y4F[d43](type, (A0i + q7Z))) {
				var bigX = 10000000; if (S9y4F[S33](x1, x0)) bigX = -10000000; var v = { "x0": x0, "x1": x1, "y0": y0, "y1": y1 }
				, bigY = STX[L23](v, bigX); x1 = bigX; y1 = bigY;
			}
			if (S9y4F[a33](type, (J6Z + F9v)) || S9y4F[Z5K](type, "horizontal") || S9y4F[(S9y4F.t3y + N3K + j1y)](type, "vertical")) {
				var bigX = 10000000, littleX = -10000000, v = { "x0": x0, "x1": x1, "y0": y0, "y1": y1 }
				, bigY = STX[L23](v, bigX), littleY = STX[L23](v, littleX); x0 = littleX; x1 = bigX; y0 = littleY; y1 = bigY;
			}
			var t0 = 0.0, t1 = 1.0, xdelta = S9y4F[U7Z](x1, x0), ydelta = S9y4F[(I7M)](y1, y0), p, q, r; for (var edge = 0; S9y4F[E2i](edge, 4) ; edge++) {
				if (S9y4F[(q4Z + N3K + j1y)](edge, 0)) { p = -xdelta; q = -(S9y4F[(A2K + j1y)](edgeLeft, x0)); }
				if (S9y4F[t3K](edge, 1)) { p = xdelta; q = (S9y4F[I6i](edgeRight, x0)); }
				if (S9y4F[(S93 + j1y)](edge, 2)) { p = -ydelta; q = -(S9y4F[V2K](edgeTop, y0)); }
				if (S9y4F[l2v](edge, 3)) { p = ydelta; q = (S9y4F[j2v](edgeBottom, y0)); }
				r = S9y4F[E0Z](q, p); if (S9y4F[k4v](y1, null) && S9y4F[(Y8y + F1v)](p, 0) && S9y4F[T5i](q, 0)) { return false; }
				if (S9y4F[T6K](p, 0)) { if (S9y4F[s0i](r, t1)) return false; else if (S9y4F[m88](r, t0)) t0 = r; }
				else if (S9y4F[q7i](p, 0)) { if (S9y4F[(k0Z + j1y)](r, t0)) return false; else if (S9y4F[v83](r, t1)) t1 = r; }
			}
			var x0clip = x0 + S9y4F[k3B](t0, xdelta), y0clip = y0 + S9y4F[H5Z](t0, ydelta), x1clip = x0 + S9y4F[X5K](t1, xdelta), y1clip = y0 + S9y4F[Y23](t1, ydelta); if (S9y4F[D7K](y1, null) && S9y4F[c48](y0, null)) { y0clip = edgeTop; y1clip = edgeBottom; x0clip = v[b0K]; x1clip = v[b0K]; if (S9y4F[j3Z](v[b0K], edgeRight)) return false; if (S9y4F[l3v](v[b0K], edgeLeft)) return false; }
			else if (S9y4F[b3K](y1, null)) { if (S9y4F[t1M](v[c8M], v[P8M])) y1clip = edgeBottom; else y1clip = edgeTop; x0clip = v[b0K]; x1clip = v[b0K]; if (S9y4F[z7Z](v[b0K], edgeRight)) return false; if (S9y4F[A3M](v[b0K], edgeLeft)) return false; }
			context.lineWidth = 1.1; if (typeof (color) == "object") { context.strokeStyle = color[J2y]; if (color[A7v]) context.globalAlpha = color[(S73 + I4y + j1y + S9y4F.W0Z + U2Z)]; else context.globalAlpha = 1; context.lineWidth = parseInt(STX[i1y](color.width)); }
			else {
				if (S9y4F[S1y](color, null) || S9y4F[R6i](color, "auto") || STX[g58](color)) { context.strokeStyle = this[E5K]; }
				else { context.strokeStyle = color; }
			}
			if (parameters[A7v]) context.globalAlpha = parameters[A7v]; if (parameters.lineWidth) context.lineWidth = parameters.lineWidth; if (S9y4F[F4M](type, "zig zag")) context.lineWidth = 5; var pattern = null; if (parameters[U58]) {
				pattern = parameters[U58]; if (S9y4F[h6Z](pattern, "solid")) { pattern = null; }
				else if (S9y4F[H7M](pattern, "dotted")) { pattern = [context.lineWidth, context.lineWidth]; }
				else if (S9y4F[(S9y4F.a5Z + I0Z)](pattern, "dashed")) { pattern = [S9y4F[J38](context.lineWidth, 5), S9y4F[d4v](context.lineWidth, 5)]; }
			}
			try { context[f4Z](x0clip, y0clip, x1clip, y1clip, context.strokeStyle, context.globalAlpha, context.lineWidth, pattern); }
			catch (e) { }
			context.stroke(); context.globalAlpha = 1;
		}
		; STXChart.prototype.connectTheDots = function (points, color, type, context, confineToPanel, parameters) {
			var M48 = "dashedLineTo", L0v = "o6N", v98 = "u6N", H1Z = "v6N", S3M = "e6N", I1Z = "d6N", x5Z = "W6N", c63 = "I6N", w3y = "w6N", A63 = "U6N", m0v = "m6N", T1y = "Q6N", T48 = "N6N", l4y = "Z6N", W93 = "a6N", W3v = "n6N", o3v = "C6N", p1i = "L6N", p7B = "c6N", f23 = "g5N", S5y = "O5N", O43 = "p5N", Z33 = "x5N", n8M = "f5N", J93 = "y5N", k68 = "r5N", B2v = "B5N", d1v = "t5N", U08 = "h5N", A8y = "P5N", Z5v = "A5N", e78 = "F5N", a4K = "i5N", B0y = "K5N", F78 = "V5N", D1v = "R3c", L73 = "l3c"; if (!parameters) parameters = {}
			; if (S9y4F[L73](parameters[U58], "none")) return; if (S9y4F[D1v](confineToPanel, true)) confineToPanel = this[n48][v73]; if (S9y4F[F78](context, null) || typeof (context) == "undefined") context = this[n48][U83]; if (S9y4F[B0y](points.length, 4)) return; var edgeTop = 0, edgeBottom = this[n48][a18], edgeLeft = 0, edgeRight = this[(r28 + p6Z)].width; if (confineToPanel) { edgeBottom = confineToPanel[n5K][C2Z]; edgeTop = confineToPanel.yAxis.top; }
			context.lineWidth = 1.1; if (typeof (color) == "object") { context.strokeStyle = color[J2y]; if (color[A7v]) context.globalAlpha = color[A7v]; else context.globalAlpha = 1; context.lineWidth = parseInt(STX[i1y](color.width)); }
			else {
				if (S9y4F[(M9Z + b8K + D5y)](color, null) || S9y4F[a4K](color, "auto") || STX[g58](color)) { context.strokeStyle = this[E5K]; }
				else { context.strokeStyle = color; }
			}
			if (parameters[A7v]) context.globalAlpha = parameters[A7v]; if (parameters.lineWidth) context.lineWidth = parameters.lineWidth; var pattern = null; if (parameters[U58]) {
				pattern = parameters[U58]; if (S9y4F[e78](pattern, "solid")) { pattern = null; }
				else if (S9y4F[Z5v](pattern, "dotted")) { pattern = [context.lineWidth, context.lineWidth]; }
				else if (S9y4F[A8y](pattern, "dashed")) { pattern = [S9y4F[U08](context.lineWidth, 5), S9y4F[d1v](context.lineWidth, 5)]; }
			}
			context.beginPath(); for (var i = 0; S9y4F[B2v](i, points.length - 2) ; i += 2) {
				var x0 = points[i], y0 = points[i + 1], x1 = points[i + 2], y1 = points[i + 3]; if (isNaN(x0) || isNaN(x1) || isNaN(y0) || isNaN(y1)) return; var t0 = 0.0, t1 = 1.0, xdelta = S9y4F[k68](x1, x0), ydelta = S9y4F[J93](y1, y0), p, q, r; for (var edge = 0; S9y4F[n8M](edge, 4) ; edge++) {
					if (S9y4F[Z33](edge, 0)) { p = -xdelta; q = -(S9y4F[O43](edgeLeft, x0)); }
					if (S9y4F[S5y](edge, 1)) { p = xdelta; q = (S9y4F[f23](edgeRight, x0)); }
					if (S9y4F[p7B](edge, 2)) { p = -ydelta; q = -(S9y4F[p1i](edgeTop, y0)); }
					if (S9y4F[(o3v)](edge, 3)) { p = ydelta; q = (S9y4F[W3v](edgeBottom, y0)); }
					r = S9y4F[W93](q, p); if (S9y4F[l4y](y1, null) && S9y4F[T48](p, 0) && S9y4F[T1y](q, 0)) { return false; }
					if (S9y4F[m0v](p, 0)) { if (S9y4F[A63](r, t1)) return false; else if (S9y4F[w3y](r, t0)) t0 = r; }
					else if (S9y4F[c63](p, 0)) { if (S9y4F[x5Z](r, t0)) return false; else if (S9y4F[I1Z](r, t1)) t1 = r; }
				}
				var x0clip = x0 + S9y4F[S3M](t0, xdelta), y0clip = y0 + S9y4F[H1Z](t0, ydelta), x1clip = x0 + S9y4F[v98](t1, xdelta), y1clip = y0 + S9y4F[L0v](t1, ydelta); try {
					if (pattern) { context[M48](x0clip, y0clip, x1clip, y1clip, pattern); }
					else { context.moveTo(x0clip, y0clip); context.lineTo(x1clip, y1clip); }
				}
				catch (e) { }
			}
			context.stroke(); context.closePath(); context.globalAlpha = 1;
		}
		; STXChart.prototype.plotSpline = function (points, tension, color, type, context, confineToPanel, parameters) {
			var j9y = "T9N", k1v = "D9N", z2M = "M9N", V0K = "X9N", n9v = "z9N", C0M = "acit", x7v = "S9N", D7y = "G9N", R03 = "H9N", p1Z = "Y9N", a6K = "q9N"; if (!parameters) parameters = {}
			; if (S9y4F[a6K](parameters[U58], "none")) return; if (S9y4F[p1Z](confineToPanel, true)) confineToPanel = this[n48][v73]; if (S9y4F[R03](context, null) || typeof (context) == "undefined") context = this[n48][(j1y + B6Z + U0K + d93 + S9y4F.t3y)]; context.save(); context.lineWidth = 1.1; if (typeof (color) == "object") { context.strokeStyle = color[J2y]; if (color[A7v]) context.globalAlpha = color[A7v]; else context.globalAlpha = 1; context.lineWidth = parseInt(STX[i1y](color.width)); }
			else {
				if (S9y4F[D7y](color, null) || S9y4F[x7v](color, "auto") || STX[g58](color)) { context.strokeStyle = this[E5K]; }
				else { context.strokeStyle = color; }
			}
			if (parameters[A7v]) context.globalAlpha = parameters[(B6Z + k5Z + C0M + q7Z)]; if (parameters.lineWidth) context.lineWidth = parameters.lineWidth; var pattern = null; if (parameters[(k5Z + I4y + S9y4F.t3y + L5i + a6Z)]) {
				pattern = parameters[U58]; if (S9y4F[n9v](pattern, "solid")) { pattern = null; }
				else if (S9y4F[V0K](pattern, "dotted")) { pattern = [context.lineWidth, context.lineWidth]; }
				else if (S9y4F[z2M](pattern, "dashed")) { pattern = [S9y4F[k1v](context.lineWidth, 5), S9y4F[j9y](context.lineWidth, 5)]; }
			}
			if (pattern && context[B28]) { context[B28](pattern); context[g7K] = 0; }
			plotSpline(points, tension, context); context.restore();
		}
		; STXChart.prototype.drawingClick = function (panel, x, y) {
			var J8Z = "Nam", I1y = "sw", e08 = "drawing", Y5i = "hair", s98 = "click", J2Z = "fNec", Q1K = "adjus", v1v = "k9N", P1K = "ctiveD", F0y = "construct", F5i = "Too", I4v = "awi", U73 = "egister", w9y = "wing"; if (!this[g23]) {
				if (!panel) return; var Factory = STXChart[(f1M + w9y + l3B + B6Z + B6Z + J6Z + S9y4F.a5Z)][STXChart[m7M]]; if (!Factory) {
					if (STX[N7Z][STXChart[m7M]]) { Factory = STX[N7Z][STXChart[m7M]]; STXChart[(S9y4F.b3y + U73 + p0v + I4v + Y9K + F5i + J6Z)](STXChart[m7M], Factory); }
				}
				if (Factory) {
					this[g23] = new Factory; this[g23][F0y](this, panel); if (!this[M18][panel[s5i]]) {
						if (this[g23][G5i]) { this[g23] = S9y4F.o6i; return; }
					}
				}
			}
			if (this[g23]) {
				if (this[K4Z] && !this[(I4y + P1K + S9y4F.b3y + I4y + w9y)][M68]) { if (!STXChart[G53]) this[g23] = S9y4F.o6i; return; }
				var tick = S9y4F[v1v](this[U3y](x, panel[n48]), this[v3Z][y2Z]), panel = this[w2K][this[g23][z4M]], value = this[p5y](panel, tick, this[o18](y, panel)); if (this[l1Z][V7M] && this[t7K]) { value = this[(Q1K + m9y + J2Z + B23 + S9y4F.a5Z + I4y + S9y4F.b3y + q7Z)](panel, tick, this[t7K]); }
				if (this[g23][s98](this[n48][u28][U83], tick, value)) {
					if (this[g23]) { STXChart[G53] = j8Z; STX[(f18 + H6M + N68 + I4y + a6Z + N03)](this[n48][(V9i + k5Z + N48 + a6Z + S9y4F.u7Z + I4y + S9y4F.a5Z)], this); this[J1y](this[g23]); this[g23] = S9y4F.o6i; this[c2y](); this[v4y](l68); STX[W7M](this[E0y][K33], (S9y4F.a5Z + S9y4F.t3y + P7Z + z3v + U8i + S9y4F.a5Z + S9y4F.a5Z + Y5i), n43); STX[W7M](this[E0y][Y73], C08, n43); }
				}
				else { this[v4y](e08); STXChart[G53] = L9i; STX[(I1y + B3B + G2K + C7Z + S9y4F.a5Z + S9y4F.a5Z + J8Z + K1y)](this[E0y][K33], n43, C08); STX[W7M](this[E0y][Y73], n43, C08); }
				return L9i;
			}
			return j8Z;
		}
		; STXChart.prototype.whichPanel = function (y) {
			var Q2v = "s9N", e68 = "J9N"; for (var p in this[w2K]) { var panel = this[w2K][p]; if (panel[A9y]) continue; if (S9y4F[e68](y, panel.top) && S9y4F[Q2v](y, panel[C2Z])) return panel; }
			return S9y4F.o6i;
		}
		; STXChart.prototype.mouseup = function (e) {
			var n83 = "i0N", r7K = "j0N", t1v = "K0N", j5M = "V0N", v08 = "R9N", I2Z = "l9N", u7M = "b9N", s4i = "ssNa", w7M = "pp", K6y = "una", R6v = "E9N", a13 = "ointe", E0v = "serP", wasMouseDown = this[(B3y + E0v + a13 + y68 + B6Z + k7Z + a6Z)]; this[K4Z] = j8Z; if (!this[a9i]) return; this[Q93] = j8Z; if (S9y4F[R6v](this[Y4M], Z3y)) return; if (this[Y4i]) { STX[e58](document[D6i], Y2y); this[Y4i] = j8Z; return; }
			if (STXChart[L13]) STX[(K6y + w7M + i9Z + G2K + J6Z + I4y + s4i + Y9Z + K1y)](document[D6i], Y2y); if (S9y4F[u7M](STXChart[n8Z], S9y4F.o6i)) { STX[x4y](this[n48][u28], this); this[e0y](); STXChart[n8Z] = S9y4F.o6i; return; }
			if (!e) e = event; if ((e[u8v] && S9y4F[I2Z](e[u8v], S9y4F.V3B)) || (e[y4y] && S9y4F[v08](e[y4y], S9y4F.V3B))) {
				if (this[c3v]) { this[o7v](); if (e[b63]) e[b63](); return j8Z; }
				else { return L9i; }
			}
			if (!e[X3y]) { e[X3y] = e[T88] + document[D6i][f4K] + document[v5M][f4K]; e[j5Z] = e[O3M] + document[(Q4y + B6Z + u4y + q7Z)][Q18] + document[v5M][Q18]; }
			if (S9y4F[j5M](e[X3y], this[n48][K1Z]) || S9y4F[t1v](e[X3y], this[n48][L0Z])) return; if (S9y4F[r7K](e[j5Z], this.chart.top) || S9y4F[n83](e[j5Z], this[n48][C2Z])) return; if (this[G5Z](Y2M, arguments)) return; if (wasMouseDown) { var cy = this[u2y](e[j5Z]), cx = this[a8y](e[(k5Z + I4y + A4Z + q0M)]); this[o13](this[W1y], cx, cy); }
			if (this[P9i](Y2M, arguments)) return;
		}
		; STXChart.prototype.grabbingHand = function () { if (!this[Q93]) return; if (STX[I5M]) return; STX[e18](document[D6i], Y2y); }
		; STXChart.prototype.mousedown = function (e) {
			var j1i = "bStartZ", P2Z = "leW", e9i = "cree", s9Z = "Cli", s03 = "r0N", f6Z = "B0N", Q5M = "t0N", d0K = "h0N", p83 = "P0N", f28 = "A0N", o78 = "TouchA", G6Z = "nage", X9M = "F0N", u2v = "rri", K1M = "abOv"; if (this[G5Z](C2v, arguments)) return; this[(f4M + K1M + K1y + u2v + u4y + T8M + J6Z + j98 + d9Z)] = j8Z; if (S9y4F[X9M](this[Y4M], Z3y)) return; if (!this[a9i]) return; if (!this[R6y]) return; if (!STXChart[L13]) return; if (this[(Y9Z + I4y + G6Z + o78 + w8K + U9v + f6v + K1y)] && e && e[b63]) e[b63](); this[K4Z] = L9i; if (!e) e = event; if ((e[u8v] && S9y4F[f28](e[u8v], S9y4F.V3B)) || (e[(Q4y + B3y + i1Z + h73)] && S9y4F[p83](e[y4y], S9y4F.V3B))) { return; }
			for (var p in this[w2K]) {
				var panel = this[w2K][p]; if (panel[l83]) { STXChart[n8Z] = panel; return; }
			}
			if (!e[X3y]) { e[X3y] = e[T88] + document[D6i][f4K] + document[v5M][f4K]; e[j5Z] = e[O3M] + document[D6i][Q18] + document[v5M][Q18]; }
			if (S9y4F[d0K](e[X3y], this[n48][K1Z]) && S9y4F[Q5M](e[X3y], this[n48][L0Z]) && S9y4F[f6Z](e[j5Z], this.chart.top) && S9y4F[s03](e[j5Z], this[n48][(c9i + E73)])) { this[(f1M + k7Z + G7i + A4Z + s9Z + b18)](this[W1y], this[D98], this[n58]); if (this[g23] && this[g23][M68]) return; }
			this[(f4M + I4y + Q4y + F1i + a6Z + i13 + e9i + a6Z)] = L9i; this[I98] = j8Z; if (!e) e = event; if (!e[X3y]) { e[X3y] = e[T88] + document[D6i][f4K] + document[v5M][f4K]; e[j5Z] = e[O3M] + document[D6i][Q18] + document[v5M][Q18]; }
			var chart = this[W1y][n48]; this[V8y] = e[X3y]; this[F8y] = e[j5Z]; this[h1v] = chart[i2v]; this[K1v] = chart[v73][n5K][i2v]; this[v43] = this[v3Z][(j1y + W6M + P2Z + S9y4F.W0Z + u4y + S9y4F.t3y + S9y4F.n0Z)]; this[(f4M + I4y + j1i + n73 + Y9Z)] = chart[v73][n5K][f08]; setTimeout((function (self) {
				return function () { self[a4v](); }
				;
			}
			)(this), z8M); if (this[P9i](C2v, arguments)) return;
		}
		; STXChart.prototype.changeVectorType = function (value) { STXChart[m7M] = value; if (STXChart[G53]) this[q5K](); this[(S9y4F.a5Z + j23 + G2K + S9y4F.b3y + B6Z + r4y + S9y4F.n0Z + Y7y + N68 + Y33 + B6Z + S9y4F.b3y + S9y4F.a5Z)](); if (STXChart[L13]) this[z63](); }
		; STXChart.prototype.removeOverlay = function (name) {
			var a1i = "y0N", D83 = "runP"; if (this[(D83 + S9i + j5K + u4y)](X7y, arguments)) return; for (var o in this[W33]) {
				var sd = this[W33][o]; if (S9y4F[a1i](sd[b6M], name)) { this[X7y](sd[s5i]); }
			}
			delete this[v3Z][i4K][name]; delete this[W33][name]; this[Y6Z](); this[j3K](); this[v4y](v3Z); this[P9i](X7y, arguments);
		}
		; STXChart.prototype.addSeries = function (field, parameters) {
			var X2Z = "ies", O8i = "addS", A3B = "x0N", c7Z = "f0N"; if (this[G5Z]((I4y + u4y + g98 + K1y + S9y4F.b3y + S9y4F.W0Z + K1y + S9y4F.a5Z), arguments)) return; if (!parameters) parameters = {}
			; if (!parameters[S6K]) parameters[S6K] = this[n48][(a6Z + C3B + K1y)]; var obj = { parameters: STX[H2M](parameters), yValueCache: new Array(), display: field, isStep: (parameters[r48] && S9y4F[c7Z](parameters[r48], "step")) }
			; if (S9y4F[A3B]("display", obj[w6K])) obj[G5v] = obj[w6K][G5v]; var chart = this[M18][parameters[S6K]]; function addSeriesData(stx) {
				var h68 = "c4N", Q48 = "g0N", S8i = "O0N", V53 = "0N", mIterator = 0, cIterator = 0; while (S9y4F[(k5Z + V53)](mIterator, stx[(Y9Z + I4y + l4i + y68 + I4y + P7y)].length) && S9y4F[S8i](cIterator, parameters.data.length)) {
					var c = parameters.data[cIterator], m = stx[a78][mIterator]; if (!c[U3M] || typeof c[U3M] == "undefined") c[U3M] = STX[M3M](c[a03]); if (S9y4F[Q48](c[U3M][u68](), m[(g9y + l3B)][u68]())) { m[field] = c[U5M]; cIterator++; mIterator++; continue; }
					if (S9y4F[h68](c[(g9y + l3B)], m[U3M])) cIterator++; else mIterator++;
				}
			}
			if (parameters.data && this[a78]) { addSeriesData(this); }
			else { obj[(O8i + K1y + S9y4F.b3y + X2Z + g9y + L1y)] = addSeriesData; }
			if (chart) chart[B9i][field] = obj; this[P9i]((W2y + g98 + K1y + S9y4F.b3y + C58 + S9y4F.a5Z), arguments); return obj;
		}
		; STXChart.prototype.removeSeries = function (field, chart) { var Q4M = "eSe"; if (this[G5Z]((S9y4F.b3y + v48 + S9y4F.u7Z + Q4M + S9y4F.b3y + C58 + S9y4F.a5Z), arguments)) return; if (!chart) chart = this[n48]; delete chart[B9i][field]; this[P9i](b58, arguments); }
		; STXChart.prototype.drawLegendItem = function (xy, label, color) { var x = xy[S9y4F.Y3B], y = xy[S9y4F.K3B], w = W1Z, h = W1Z, context = this[n48][U83]; context.fillStyle = color; context.fillRect(x, y, w, h); x += w + S9y4F.V3B; context.fillStyle = this[E5K]; context.fillText(label, x, y); x += context.measureText(label).width + 6; return [x, y]; }
		; STXChart.prototype.drawLegend = function (chart, legendColorMap) {
			var k28 = "dI", P1i = "Lege", T0M = "drawLegendItem", J3y = "C4N", A28 = "rT", w68 = "L4N", s6Z = "leg"; if (this[G5Z]("drawLegend", arguments)) return; var context = this[n48][U83]; context.textBaseline = "top"; var xy = [chart[L7M][P7Z], chart[(s6Z + H43 + u4y)][q7Z]], lineColor = this[a0y]("stx_line_chart"); if (S9y4F[w68](this[v3Z][c88], "mountain")) { var c = this[j2M]("stx_mountain_chart"), strokeStyle = c[(Y0i + S9y4F.b3y + e2M + A28 + B6Z + k5Z + G2K + B6Z + u0Z + S9y4F.b3y)]; if (strokeStyle && S9y4F[J3y](strokeStyle, "transparent")) lineColor = strokeStyle; }
			xy = this[T0M](xy, chart[e5K], lineColor); for (var field in legendColorMap) { xy = this[(f1M + k7Z + P1i + a6Z + k28 + S9y4F.t3y + I43)](xy, field, legendColorMap[field]); }
			this[P9i]("drawLegend", arguments);
		}
		; STXChart.prototype.drawSeries = function (chart) {
			var B1i = "ixel", Y68 = "isP", o1Z = "YA", Y3v = "S1N", T8Z = "G1N", T03 = "H1N", O1y = "Y1N", f3Z = "q1N", F5y = "o4N", L3y = "u4N", L8i = "v4N", G93 = "e4N", p9i = "d4", I8y = "W4N", c8v = "I4N", c23 = "yV", g8v = "w4N", P5v = "U4N", T1K = "m4N", n9i = "Q4N", R43 = "N4N", O8v = "Z4N", k98 = "a4N", n38 = "marginBottom", d98 = "marginTop", q23 = "n4N", K6M = "minMax"; if (this[G5Z]("drawSeries", arguments)) return; var quotes = chart[q3B], legendColorMap = {}
			; for (var field in chart[B9i]) {
				var series = chart[B9i][field], parameters = series[w6K], panel = chart[v73]; if (parameters[v73]) panel = this[w2K][parameters[v73]]; if (!panel) continue; var yAxis = panel[n5K], bottom = panel[C2Z], minMax = STX[K6M](quotes, field), min = minMax[0], top = panel.top, bottom = panel[C2Z], height = S9y4F[q23](bottom, top), t = parameters[d98], b = parameters[n38]; if (t) top = S9y4F[k98](t, 1) ? (top + t) : (top + (S9y4F[O8v](height, t))); if (b) bottom = S9y4F[R43](b, 1) ? (S9y4F[n9i](bottom, b)) : (S9y4F[T1K](bottom, (height * b))); var multiplier = S9y4F[(P5v)]((bottom - top), (minMax[1] - min)), started = false, lastPoint = null, val = x = y = px = py = null, cw = this[v3Z][C9i], offset = this[O1M], context = this[n48][U83], isStep = series[b2v]; context.beginPath(); if (S9y4F[g8v](series[S78].length, quotes.length)) series[(c23 + B4i + G2K + h7Z + K1y)] = new Array(quotes.length); var yValueCache = series[S78], reset = false, lastVal = null; for (var i = 0; S9y4F[c8v](i, quotes.length) ; i++) {
					var quote = quotes[i]; if (!quote) continue; if (quote.transform && series[w6K][b8i]) quote = quote.transform; val = quote[field]; if (!val && S9y4F[I8y](val, 0)) {
						if (isStep) { yValueCache[i] = y; }
						continue;
					}
					lastVal = val; if (!isStep && lastPoint && S9y4F[(p9i + D5y)](lastPoint, i - 1)) { px = x, py = y; }
					else { px = null; }
					if (S9y4F[G93](i, 0)) { x = 0; }
					else { x = Math[z0Z](S9y4F[L8i](i, cw)) + offset; }
					if (isStep && started) { context.lineTo(x, y); }
					if (series[w6K][b8i]) { y = this[o4K](val, panel); }
					else { y = S9y4F[L3y](bottom, ((val - min) * multiplier)); }
					if (S9y4F[F5y](px, null)) {
						var vector = { x0: px, x1: x, y0: py, y1: y }
						; for (; S9y4F[f3Z](lastPoint, i) ; lastPoint++) { var xInt = Math[z0Z](S9y4F[O1y](lastPoint, cw)) + offset, yInt = STX[L23](vector, xInt); yValueCache[lastPoint] = yInt; }
					}
					yValueCache[i] = y; if (S9y4F[T03](y, top)) {
						y = top; if (reset) { context.moveTo(x, y); continue; }
						reset = true;
					}
					else if (S9y4F[T8Z](y, bottom)) {
						y = bottom; if (reset) { context.moveTo(x, y); continue; }
						reset = true;
					}
					else { reset = false; }
					if (!started) { started = true; context.moveTo(x, y); }
					else { context.lineTo(x, y); }
					lastPoint = i;
				}
				context.lineWidth = 1; if (parameters.width) context.lineWidth = parameters.width; if (series[L88]) context.lineWidth = S9y4F[Y3v](context.lineWidth, 2); context.strokeStyle = this[E5K]; if (parameters[J2y]) context.strokeStyle = parameters[J2y]; context.stroke(); context.closePath(); if (series[w6K][b8i]) {
					if (yAxis[o73]) { txt = yAxis[o73](this, panel, lastVal); }
					else { txt = this[(a43 + M38 + I4y + S9y4F.t3y + o1Z + P7Z + Y68 + S9y4F.b3y + S9y4F.W0Z + F28)](lastVal, panel); }
					var y = this[(k5Z + B1i + G0y + S9y4F.b3y + B6Z + l0Z + S9y4F.b3y + S9y4F.W0Z + F28)](lastVal, panel); this[K03](panel, txt, y, context.strokeStyle, "#FFFFFF");
				}
				legendColorMap[field] = context.strokeStyle;
			}
			if (chart[L7M] && series) { this[Q2y](chart, legendColorMap); }
			this[P9i]("drawSeries", arguments);
		}
		; STXChart[E5Z] = function (interval) { var I5v = "M1N", m13 = "X1N", m9K = "z1N"; if (S9y4F[m9K](interval, D93)) return L9i; if (S9y4F[m13](interval, X83)) return L9i; if (S9y4F[I5v](interval, r3M)) return L9i; return j8Z; }
		; STXChart.prototype.isDailyInterval = function (interval) { var O88 = "mon", p1K = "k1N", d6y = "T1N", r2Z = "D1N"; if (S9y4F[r2Z](interval, D93)) return L9i; if (S9y4F[d6y](interval, X83)) return L9i; if (S9y4F[p1K](interval, (O88 + S9y4F.t3y + S9y4F.n0Z))) return L9i; return j8Z; }
		; STXChart.prototype.setPeriodicityV2 = function (period, interval, cb) {
			var j28 = "2N", g0Z = "y2N", G4v = "r2N", e2i = "B2N", p38 = "t2N", V0Z = "h2N", H6K = "P2N", i8M = "eD", M5Z = "aS", p8y = "A2N", h5K = "F2N", l18 = "i2N", Q2K = "egm", x03 = "j2N", X1y = "K2N", T38 = "V2N", P6i = "R1N", g9M = "l1N", X03 = "b1N", s4K = "E1N", c2Z = "newChart", V9y = "dataCallback", P1v = "nter", W1K = "s1N", r8y = "ailyIn", w6i = "J1N", u0v = "nP"; if (this[(S9y4F.b3y + B3y + u0v + S9i + k5Z + K1y + a6Z + u4y)]("setPeriodicityV2", arguments)) return; var switchInterval = false; if (interval) {
				var getDifferentData = false; if (S9y4F[w6i](this[E5Z](interval), this[E5Z](this[v3Z][l2M]))) getDifferentData = true; if (!this[(L98 + r8y + S9y4F.t3y + I13 + S9y4F.u7Z + o7y)](this[v3Z][l2M])) { if (S9y4F[W1K](this[v3Z][l2M], interval)) getDifferentData = true; }
				if (getDifferentData) {
					this[v3Z][(S9y4F.W0Z + P1v + g7v + J6Z)] = interval; this[v3Z][y2Z] = period; this[v4y]("layout"); if (this[V9y]) { this[V9y](); }
					else if (this[m4M]) {
						for (var chartName in this[(j1y + S9y4F.n0Z + I4y + K2i + S9y4F.a5Z)]) { var chart = this[(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y + S9y4F.a5Z)][chartName]; if (chart[e5K]) this[m4M][c2Z](chart[e5K], chart, cb); }
						return;
					}
					if (cb) cb(null); return;
				}
				this[v3Z][l2M] = interval;
			}
			for (var chartName in this[M18]) {
				var chart = this[M18][chartName], dt, pos = Math[E08](S9y4F[s4K](chart[H58], 2)), rightAligned = null; chart[H58] = Math[(y7B + a6Z + u4y)](S9y4F[X03]((this[n48].width / this[v3Z][C9i]), .499)); var centerMe = true, rightAligned = false; if (S9y4F[g9M](chart[i2v], chart[(Y9Z + I4y + P7Z + l3B + j98 + c1Z)])) centerMe = false; else if (chart[q3B] && !chart[q3B][pos]) { centerMe = false; rightAligned = S9y4F[P6i](chart[i2v], chart[B6K].length); }
				if (centerMe && chart[q3B] && S9y4F[T38](chart[q3B].length, 0)) {
					if (S9y4F[X1y](chart[H58], ((Math[E08]((this[n48].width / this[v3Z][C9i]) - .499) - 1) / 2))) { pos = S9y4F[(x03)](chart[(u4y + I4y + S9y4F.t3y + I4y + U3B + Q2K + K1y + U0K)].length, 1); }
					if (S9y4F[l18](pos, chart[q3B].length)) { dt = chart[q3B][S9y4F[h5K](chart[q3B].length, 1)][U3M]; pos = S9y4F[p8y](chart[(e3M + S9y4F.t3y + M5Z + K1y + A4Z + a53 + S9y4F.t3y)].length, 1); }
					else { dt = chart[(u4y + I4y + P7y + U3B + V73 + v5v + U0K)][pos][U3M]; }
				}
				this[v3Z][y2Z] = period; this[(j1y + S9i + I4y + S9y4F.t3y + i8M + I4y + S9y4F.t3y + M5Z + K1y + S9y4F.t3y)](); if (centerMe) {
					if (chart[q3B] && S9y4F[H6K](chart[q3B].length, 0)) {
						for (var i = S9y4F[(V0Z)](chart[B6K].length, 1) ; S9y4F[p38](i, 0) ; i--) {
							var nd = chart[(u4y + L1y + U3B + K1y + S9y4F.t3y)][i][U3M]; if (S9y4F[e2i](nd[u68](), dt[u68]())) { chart[i2v] = (S9y4F[G4v](chart[B6K].length, i)) + pos; break; }
						}
					}
				}
				else if (!rightAligned) { var wsInTicks = Math[(S9y4F.b3y + B6Z + n0v + u4y)](S9y4F[g0Z](this[l1Z][y1v], this[v3Z][C9i])); chart[i2v] = S9y4F[(q4Z + j28)](chart[H58], wsInTicks); }
				else { chart[i2v] = chart[B6K].length + rightAligned; }
			}
			this[c2y](); this[v4y]("layout"); if (cb) cb(null); if (this[P9i]("setPeriodicityV2", arguments)) return;
		}
		; STXChart.prototype.drawVectors = function () {
			var t18 = "unAp", W7Z = "p2N", o7M = "x2N", R18 = "ho"; if (this[(f8v + u08 + B6Z + X2i + U3B + R18 + k7Z + G7i + A4Z)]) return; if (this[G5Z]("drawVectors", arguments)) return; this[h7M] = true; if (!this[n48][t5i]) {
				var tmpPanels = {}
				; for (var i = 0; S9y4F[o7M](i, this[L8M].length) ; i++) {
					var drawing = this[(u4M + I4y + k7Z + c4v + b5y + Q4y + M9Z + K1y + m4Z)][i], panelName = drawing[z4M]; if (!this[w2K][drawing[z4M]]) continue; if (!tmpPanels[panelName]) { tmpPanels[panelName] = []; }
					tmpPanels[panelName][e8Z](drawing);
				}
				for (var panelName in tmpPanels) {
					this[D0v](panelName); var arr = tmpPanels[panelName]; for (var i = 0; S9y4F[W7Z](i, arr.length) ; i++) { var drawing = arr[i]; drawing[A9i](this[n48][U83]); }
					this[k1K]();
				}
			}
			if (this[(S9y4F.b3y + t18 + j5K + u4y)]("drawVectors", arguments)) return;
		}
		; STXChart.prototype.consolidatedQuote = function (quotes, position, periodicity, interval, dontRoll) {
			var R3Z = "consolidate", L7y = "t3N", C6y = "h3N", r8v = "P3N", e7Z = "A3N", x5y = "F3N", j6Z = "i3N", n9M = "j3N", r9y = "K3N", m78 = "V3N", B4Z = "R7N", I1i = "l7N", E3K = "b7N", N6y = "E7N", K58 = "I8N", Z6i = "w8N", o2i = "m8N", P9y = "Q8", I9i = "N8N", v68 = "Z8N", h9v = "a8N", P6Z = "n8N", G3v = "C8N", p7K = "Adj_Close", F3Z = "L8N", e8K = "c8N", l1M = "Split_Close", B4y = "g2N", R9K = "dontRoll", t5M = "O2N"; if (S9y4F[t5M](position, 0)) return null; if (this[G5Z]("consolidatedQuote", arguments)) return null; if (!dontRoll && this[R9K]) dontRoll = true; var ratio = 1; if (this[v3Z][P8v] && S9y4F[B4y](quotes[position][l1M], null)) { ratio = S9y4F[e8K](quotes[position][l1M], quotes[position][Y88]); }
			else if (this[(J6Z + I4y + q7Z + M23 + S9y4F.t3y)][P8v] && S9y4F[F3Z](quotes[position][p7K], null)) { ratio = S9y4F[G3v](quotes[position][p7K], quotes[position][Y88]); }
			var q = quotes[position], quote = {}
			; for (var field in q) { quote[field] = q[field]; }
			if (S9y4F[P6Z]("Open", quote)) quote[q6v] = S9y4F[h9v](q[q6v], ratio); if (S9y4F[v68]("Close", quote) && S9y4F[I9i](quote[Y88], null)) quote[Y88] = S9y4F[(P9y + D5y)](q[Y88], ratio); if (S9y4F[o2i]("High", quote)) quote[P5y] = S9y4F[(y93 + D5y)](q[P5y], ratio); if (S9y4F[Z6i]("Low", quote)) quote[a3v] = S9y4F[K58](q[a3v], ratio); function consolidate(self, p) {
				var r78 = "rati", B7y = "S7N", S38 = "G7N", k6y = "H7", d58 = "Y7N", w0Z = "q7N", C63 = "o8N", x8K = "v8N", W8y = "e8N", W18 = "t_C", r33 = "pli", J2i = "d8N", C13 = "W8N"; if (self[v3Z][P8v] && S9y4F[C13](quotes[p][l1M], null)) { ratio = S9y4F[J2i](quotes[p][(U3B + r33 + W18 + L28 + K1y)], quotes[p][Y88]); }
				if (S9y4F[W8y]("High", quotes[p])) if (S9y4F[x8K](quotes[p][P5y] * ratio, quote[P5y])) quote[P5y] = S9y4F[(B3y + N3K + D5y)](quotes[p][P5y], ratio); if (S9y4F[C63]("Low", quotes[p])) if (S9y4F[w0Z](quotes[p][a3v] * ratio, quote[a3v])) quote[a3v] = S9y4F[d58](quotes[p][a3v], ratio); quote[e43] += quotes[p][e43]; if (S9y4F[(k6y + D5y)]("Close", quotes[p]) && S9y4F[S38](quotes[p][Y88], null)) quote[Y88] = S9y4F[(B7y)](quotes[p][Y88], ratio); quote[(r78 + B6Z)] = ratio;
			}
			function newInterval(p, interval) {
				var g63 = "k7N", p0K = "D7N", K6v = "etDay", F2i = "M7N", W9Z = "X7N", D8M = "z7N", d1 = quotes[S9y4F[D8M](p, 1)][U3M], d2 = quotes[p][U3M]; if (S9y4F[W9Z](interval, "week")) { if (S9y4F[F2i](d2[(A4Z + K6v)](), d1[H8y]())) return true; }
				else if (S9y4F[p0K](interval, (Y9Z + h73 + S9y4F.t3y + S9y4F.n0Z))) { if (S9y4F[(l3B + N8K + D5y)](d2[j0i](), d1[j0i]())) return true; }
				else { if (S9y4F[g63](d2[H8y](), d1[H8y]())) return true; }
				return false;
			}
			function newIntradayInterval(position, p, periodicity, interval) { var g6M = "s7N", o4y = "J7N", nextBar = S9y4F[o4y](interval, periodicity), d1 = new Date(quotes[position][U3M]); d1[R0i](d1[O5Z]() + nextBar); var d2 = quotes[p][U3M]; if (S9y4F[g6M](d2[u68](), d1[u68]())) return true; return false; }
			var p = position; if ((S9y4F[N6y](interval, (k7Z + K1y + K1y + d9Z)) || S9y4F[E3K](interval, "month")) && !dontRoll) {
				for (var i = 1; S9y4F[I1i](i, periodicity) ; i++) {
					while (S9y4F[B4Z](p + 1, quotes.length) && !newInterval(p + 1, interval)) { p++; consolidate(this, p); }
					if (S9y4F[m78](i, periodicity)) { p++; if (S9y4F[r9y](p, quotes.length)) consolidate(this, p); }
				}
			}
			else if (!this[E5Z](interval) && S9y4F[n9M](periodicity, 1)) {
				for (var i = 1; S9y4F[j6Z](i, periodicity) ; i++) {
					p = position + i; if (S9y4F[x5y](p, quotes.length) && newIntradayInterval(position, p, periodicity, interval)) { p--; break; }
					if (S9y4F[e7Z](p, 0) && S9y4F[r8v](p, quotes.length)) { consolidate(this, p); }
				}
			}
			else {
				for (var i = 1; S9y4F[C6y](i, periodicity) ; i++) {
					p = position + i; if (S9y4F[L7y](p, 0) && S9y4F[(B2K + S9y4F.z6K + D5y)](p, quotes.length)) { consolidate(this, p); }
				}
			}
			for (var i in this[n18]) { var plugin = this[n18][i]; if (plugin[R3Z]) plugin[R3Z](quotes, position, p, quote); }
			this[P9i]("consolidatedQuote", arguments); return { "quote": quote, "position": p + 1 }
			;
		}
		; d4F(S9y4F.Y3B); E4F(S9y4F.K3B); p4F(S9y4F.V3B); v4F(S9y4F.a3B); l4F(S9y4F.Z3B); g4F(S9y4F.F1Z); o4F(V1Z); STXChart.prototype.displayChart = function (chart) {
			var t2y = "v5Q", N6i = "e5Q", n8v = "d5Q", W13 = "xt", A1v = "volbar", u9K = "W5", P2K = "I5Q", A7Z = "w5Q", Q2Z = "volUnderlay", l78 = "rk", S6M = "wat", m9M = "U5Q", p4v = "scatter", W4v = "m5Q", F9i = "Can", D0Z = "Q5Q", q28 = "VEN", y6M = "CLOS", L4M = "N5Q", a7Z = "Z5Q", P5i = "DLE", x43 = "a5Q", K7K = "n5Q", w3B = "C5Q", e6i = "L5Q", n53 = "drawCandles", N53 = "asCo", k9Z = "etCa", x2K = "e_dow", H6v = "ndl", n5Z = "_ca", t5y = "oll", n4y = "x_h", k13 = "ows", C03 = "awSha", F1M = "drawShadows", m5Z = "c5Q", b0M = "wBa", h2v = "_bar", X1K = "g3N", r6M = "drawBarChart", Y0v = "O3N", s8y = "drawWaveChart", k48 = "p3N", S3v = "drawMountainChart", Q7y = "mountai", M78 = "x3N", p8i = "drawLineChart", r38 = "f3N", t9v = "y3N", Z4Z = "r3N", A93 = "tmp"; this[(A93 + n3y + S8K)] = Math[E08](S9y4F[Z4Z](this[v3Z][C9i], this[n8K])); if (!(S9y4F[t9v](this[Q73], 2))) { this[Q73] += 1; }
			if (this[G5Z]("displayChart", arguments)) return; if (S9y4F[r38](this[v3Z][c88], (J6Z + G7i + K1y))) { this[p8i](chart); }
			else if (S9y4F[M78](this[v3Z][c88], (Q7y + a6Z))) { this[S3v](chart); }
			else if (S9y4F[k48](this[v3Z][c88], "wave")) { this[s8y](chart); }
			else if (S9y4F[Y0v](this[v3Z][c88], "bar")) { this[r6M](chart, "stx_line_chart"); }
			else if (S9y4F[X1K](this[v3Z][c88], (j1y + B6Z + P28 + a83 + h2v))) { this[r6M](chart, "stx_bar_up", STXChart[o98]); this[r6M](chart, "stx_bar_down", STXChart[w0M]); this[(u4y + S9y4F.b3y + I4y + b0M + S9y4F.b3y + J33 + S9y4F.b3y + S9y4F.t3y)](chart, "stx_candle_shadow", STXChart[J1K]); }
			else if (S9y4F[m5Z](this[(C7Z + c8i + r2v)][c88], "hollow_candle")) { this[F1M](chart, "stx_hollow_candle_up", STXChart[o98]); this[(u4M + C03 + u4y + k13)](chart, (O4y + n4y + t5y + E13 + n5Z + H6v + x2K + a6Z), STXChart[w0M]); this[F1M](chart, "stx_hollow_candle_even", STXChart[J1K]); var colorUp = this[Q9Z]("stx_hollow_candle_up"), colorDown = this[(A4Z + k9Z + a6Z + S9y4F.u7Z + N53 + J6Z + B6Z + S9y4F.b3y)]("stx_hollow_candle_down"), colorEven = this[Q9Z]("stx_hollow_candle_even"); this[n53](chart, colorUp, "transparent", S9y4F[e6i](STXChart[o98], STXChart[b1v])); this[n53](chart, colorDown, "transparent", S9y4F[w3B](STXChart[w0M], STXChart[b1v])); this[n53](chart, colorEven, "transparent", S9y4F[K7K](STXChart[J1K], STXChart[b1v])); this[n53](chart, this[p5Z], colorUp, S9y4F[x43](STXChart[o98], STXChart[(G2K + S9y4F.E2K + D5y + P5i + t7y + F6y)])); this[n53](chart, this[p5Z], colorDown, S9y4F[a7Z](STXChart[w0M], STXChart[l0M])); this[n53](chart, this[p5Z], colorEven, S9y4F[L4M](STXChart[(y6M + d9y + d9y + q28)], STXChart[l0M])); }
			else if (S9y4F[D0Z](this[v3Z][c88], "candle")) { this[F1M](chart, "stx_candle_shadow"); var styleArray = this[j2M]("stx_candle_up"), borderColor = styleArray["border-left-color"]; if (!borderColor) borderColor = styleArray["borderLeftColor"]; this[n53](chart, this[Q9Z]("stx_candle_up"), borderColor, STXChart[l0M]); var styleArray = this[j2M]("stx_candle_down"), borderColor = styleArray[(Q4y + B6Z + S9y4F.b3y + e2M + S9y4F.b3y + r5K + J6Z + j83 + S9y4F.t3y + r5K + j1y + B6Z + J6Z + c13)]; if (!borderColor) borderColor = styleArray["borderLeftColor"]; this[(u4y + S9y4F.b3y + B9y + F9i + u4y + J6Z + B23)](chart, this[Q9Z]("stx_candle_down"), borderColor, STXChart[b1v]); }
			else if (S9y4F[W4v](this[v3Z][(j1y + w9M + S9y4F.b3y + S9y4F.t3y + l3B + Q8i + K1y)], "scatterplot")) { this[p4v](chart); }
			if (this[v3Z][y4i]) {
				if (S9y4F[m9M](chart[(F6Z + G5y + i9y)], 0)) { this[(S6M + I13 + Y9Z + I4y + l78)]("chart", "center", "bottom", this[W5v]("Volume Not Available")); }
				else { this[Q2Z](chart); }
			}
			if (this[w2K]["vchart"] && !this[w2K]["vchart"][A9y]) {
				var quotes = this[n48][q3B]; this[n48][U83].beginPath(); this[a0y]("stx_volume_up"); for (var i = 0; S9y4F[A7Z](i, quotes.length) ; i++) { var quote = quotes[i]; if (S9y4F[P2K](quote, null)) continue; if (S9y4F[(u9K + r7B)](quote[Y88], quote[q6v])) continue; this[A1v](i, quote); }
				this[n48][(R48 + a6Z + f3y + W13)].fill(); this[n48][U83].closePath(); this[n48][U83].beginPath(); this[(z88 + h1K + S9y4F.a5Z + G2K + Y33 + c13)]("stx_volume_down"); for (var i = 0; S9y4F[n8v](i, quotes.length) ; i++) { var quote = quotes[i]; if (S9y4F[N6i](quote, null)) continue; if (S9y4F[t2y](quote[Y88], quote[q6v])) continue; this[A1v](i, quote); }
				this[n48][U83].fill(); this[n48][U83].closePath();
			}
			if (this[P9i]("displayChart", arguments)) return;
		}
		; STXChart.prototype.calculateATR = function (chart) {
			var q13 = "z6Q", D5K = "atr", l93 = "trueRange", X6i = "S6Q", P88 = "G6Q", U8Z = "H6Q", t38 = "Y6Q", A43 = "q6", T6Z = "o5Q", O7v = "Set", k4y = "u5", total = 0; for (var i = 1; S9y4F[(k4y + r7B)](i, chart[B6K].length) ; i++) { var prices = chart[(u4y + I4y + P7y + O7v)][i], pd = chart[B6K][S9y4F[T6Z](i, 1)], trueRange = Math[L8y](Math[L8y](S9y4F[(A43 + r7B)](prices[(V4y + s58 + S9y4F.n0Z)], prices[a3v]), S9y4F[t38](prices[P5y], pd[Y88])), S9y4F[(U8Z)](pd[Y88], prices[a3v])); total += trueRange; if (S9y4F[P88](i, 20)) total -= chart[B6K][S9y4F[X6i](i, 20)][l93]; prices[l93] = trueRange; prices[D5K] = S9y4F[q13](total, 20); }
		}
		; STXChart.prototype.currentQuote = function () { var I83 = "D6Q", m5i = "M6Q", N2Z = "X6Q", quote = null; for (var i = S9y4F[N2Z](this[n48][B6K].length, 1) ; S9y4F[m5i](i, 0) ; i--) if (S9y4F[I83](this[n48][B6K][i], null)) return this[n48][B6K][i]; return null; }
		; STXChart.prototype.correctIfOffEdge = function (theChart) {
			var l03 = "Off", A48 = "If", d7v = "V9Q", O0y = "R6Q", i48 = "l6Q", K73 = "b6Q", M5K = "6Q", m8K = "J6Q", W0K = "allowScrollPast", h38 = "k6Q", F2K = "T6Q"; if (this[G5Z]("correctIfOffEdge", arguments)) return; for (var chartName in this[M18]) {
				var chart = this[M18][chartName], leftPad = Math[E08](S9y4F[F2K](chart[H58], 3)); if (S9y4F[h38](leftPad, chart[B6K].length)) leftPad = chart[B6K].length; if (chart[W0K]) {
					var rightPad = S9y4F[m8K](chart[H58], leftPad); if (S9y4F[(S9y4F.a5Z + M5K)](chart[H58] - rightPad, chart[B6K].length)) { rightPad = S9y4F[(d9y + M5K)](chart[H58], chart[B6K].length); }
					if (S9y4F[K73](chart[i2v] - rightPad, chart[B6K].length)) { chart[i2v] = chart[B6K].length + rightPad; }
					if (S9y4F[i48](chart[i2v], leftPad)) { chart[i2v] = leftPad; }
				}
				else {
					if (S9y4F[O0y](chart[i2v], leftPad)) { chart[i2v] = leftPad; }
					if (S9y4F[d7v](chart[i2v], chart[B6K].length)) { chart[i2v] = chart[(v63 + g2Z + S9y4F.t3y)].length; }
				}
			}
			this[P9i]((j1y + c13 + S9y4F.b3y + W5M + S9y4F.t3y + A48 + l03 + V3v + o53), arguments);
		}
		; STXChart.prototype.createDataSegment = function (theChart) {
			var Y8K = "z9Q", a8v = "S9Q", v7y = "G9Q", b7K = "j9Q", u03 = "K9Q", Q9i = "Segme"; if (this[G5Z]("createDataSegment", arguments)) return; for (var chartName in this[M18]) {
				var chart = this[M18][chartName]; if (theChart) chart = theChart; chart[(u4y + w5y + I4y + Q9i + a6Z + S9y4F.t3y)] = []; for (var i = 0; S9y4F[u03](i, chart[H58]) ; i++) {
					position = S9y4F[b7K](chart[B6K].length, chart[i2v], i); if (S9y4F[v7y](position, chart[B6K].length) && S9y4F[a8v](position, 0)) { chart[q3B][e8Z](chart[B6K][position]); }
					else if (S9y4F[Y8K](position, 0)) { chart[q3B][e8Z](null); }
				}
				if (theChart) break;
			}
			this[P9i]("createDataSegment", arguments);
		}
		; STXChart.prototype.leftTick = function () { var f53 = "9Q"; return S9y4F[(e7y + f53)](this[(n48)][B6K].length, this[n48][i2v]); }
		; STXChart.prototype.getStartDateOffset = function () {
			var j9Z = "D9Q", t7M = "M9Q"; for (var ds = 0; S9y4F[t7M](ds, this[n48][q3B].length) ; ds++) {
				if (S9y4F[j9Z](this[n48][q3B][ds], null)) { return ds; }
			}
			return 0;
		}
		; STXChart.prototype.setStartDate = function (dt) {
			var w2v = "k9Q", q9K = "taS", h1y = "T9Q"; for (var i = 0; S9y4F[h1y](i, this[n48][(u4y + I4y + q9K + K1y + S9y4F.t3y)].length) ; i++) {
				var bar = this[n48][B6K][i]; if (S9y4F[w2v](bar[U3M][u68](), dt[u68]())) { this[n48][i2v] = S9y4F[(J6y + L3K + r7B)](this[n48][B6K].length, i); this[c2y](); return; }
			}
		}
		; STXChart.prototype.clearPixelCache = function () {
			var z1v = "s9Q", k53 = "cacheR"; for (var x in this[(M13 + F2v)]) { var panel = this[w2K][x]; panel[p3Z] = null; panel[f2K] = null; panel[Y38] = 1000000; panel[(k53 + s58 + S9y4F.n0Z + S9y4F.t3y)] = -1; }
			for (var chartName in this[M18]) {
				var chart = this[M18][chartName]; if (!chart[B6K]) continue; for (var i = 0; S9y4F[z1v](i, chart[B6K].length) ; i++) {
					chart[B6K][i][w5Z] = {}
					;
				}
			}
		}
		; STXChart.prototype.createYAxisLabel = function (panel, txt, y, backgroundColor, color) {
			var m2Z = "ppe", V83 = "P0Q", z28 = "A0Q", J5M = "F0Q", x78 = "i0Q", W8K = "j0Q", N3v = "K0Q", d9M = "V0Q", R0Z = "R9", p13 = "ft", u78 = "sL", I93 = "ya", H8Z = "l9Q", E3M = "b9Q", z4v = "E9Q", l7v = "contex", context = this[n48][(l7v + S9y4F.t3y)], margin = 3, height = this[X88]("stx_yaxis") + S9y4F[z4v](margin, 2); this[l4M]("stx_yaxis", context); try { var width = context.measureText(txt).width + S9y4F[E3M](margin, 2); }
			catch (e) { width = S9y4F[H8Z](this[n48][e5Z], this[(I93 + d33 + u78 + K1y + p13)]); }
			var x = S9y4F[(R0Z + r7B)]((this[n48][e5Z] - this[Z9K]), margin); if (S9y4F[d9M](y + (height / 2), panel[C2Z])) y = S9y4F[N3v](panel[C2Z], (height / 2)); if (S9y4F[W8K](y - (height / 2), panel.top)) y = panel.top + (S9y4F[x78](height, 2)); context.fillStyle = backgroundColor; STX[u3M](context, x, S9y4F[J5M](y, (height / 2)), width, height, 3, true, false); context.textBaseline = "middle"; context.fillStyle = color ? color : STX[N2v](backgroundColor); if (S9y4F[z28](context.fillStyle, backgroundColor)) { if (S9y4F[V83](backgroundColor[(S9y4F.t3y + B6Z + t7y + m2Z + S9y4F.b3y + G2K + I4y + S9y4F.a5Z + K1y)](), "#FFFFFF")) context.fillStyle = "#000000"; else context.fillStyle = "#FFFFFF"; }
			context.fillText(txt, x + margin, y);
		}
		; STXChart.prototype.createXAxisLabel = function (panel, txt, x, backgroundColor, color) {
			var W63 = "0Q", D4y = "FFF", M2i = "O0Q", y5K = "p0Q", H5y = "x0Q", M1Z = "f0Q", Y9i = "y0Q", V03 = "r0Q", y0Z = "B0Q", g88 = "t0Q", b9K = "h0Q", context = this[n48][U83], margin = 2, fontstyle = "stx-float-date", height = this[X88](fontstyle) + S9y4F[b9K](margin, 2); this[l4M](fontstyle, context); try { var width = context.measureText(txt).width + S9y4F[g88](margin, 2); }
			catch (e) { width = 0; }
			var y = panel.top + panel.height - height; if (S9y4F[y0Z](x + (width / 2), panel[(e5i + h63 + S9y4F.t3y)])) x = S9y4F[V03](panel[(L0Z)], (width / 2)); if (S9y4F[Y9i](x - (width / 2), panel[K1Z])) x = panel[K1Z] + (S9y4F[M1Z](width, 2)); context.fillStyle = backgroundColor; STX[u3M](context, S9y4F[H5y](x, (width / 2)), y, width, height, 3, true, false); context.textBaseline = "top"; context.fillStyle = color ? color : STX[N2v](backgroundColor); if (S9y4F[y5K](context.fillStyle, backgroundColor)) { if (S9y4F[M2i](backgroundColor[s53](), (v9K + G0y + G0y + G0y + G0y + G0y + G0y))) context.fillStyle = "#000000"; else context.fillStyle = (v9K + G0y + G0y + D4y + G0y); }
			context.fillText(txt, S9y4F[(A4Z + W63)](x, width / 2, margin), y + margin);
		}
		; STXChart.prototype.drawCurrentHR = function () {
			var n5y = "i4Q", G98 = "j4Q", m4y = "K4Q", p3M = "V4Q"; if (this[G5Z]("drawCurrentHR", arguments)) return; var backgroundColor, color, currentClose; for (var chartName in this[M18]) {
				var chart = this[M18][chartName], panel = chart[v73], yAxis = panel[n5K], whichSet = yAxis[k43]; if (!whichSet) whichSet = "dataSet"; var l = chart[whichSet].length; if (l) {
					var quote = chart[whichSet][S9y4F[p3M](l, 1)], prevClose = currentClose = quote[Y88]; if (S9y4F[m4y](chart[B6K].length, 2)) { var quote2 = chart[whichSet][S9y4F[G98](l, 2)]; prevClose = quote2[Y88]; }
					if (S9y4F[(n5y)](currentClose, prevClose)) { backgroundColor = this[j2M]("stx_current_hr_down")["backgroundColor"]; color = this[j2M]("stx_current_hr_down")["color"]; }
					else { backgroundColor = this[j2M]("stx_current_hr_up")["backgroundColor"]; color = this[j2M]("stx_current_hr_up")["color"]; }
					if (quote.transform) quote = quote.transform; var txt; if (yAxis[o73]) { txt = yAxis[o73](this, panel, quote[Y88]); }
					else { txt = this[Y2v](quote[Y88], panel); }
					var y = this[o4K](quote[Y88], panel); this[K03](panel, txt, y, backgroundColor, color);
				}
			}
			this[P9i]("drawCurrentHR", arguments);
		}
		; STXChart.prototype.getDefaultColor = function () {
			var f68 = .65, k6Z = "F4Q", n2y = "hsv", s3B = "pare", C2i = "isT", f63 = "tagName", p18 = "are"; this[E5K] = j73; var bgColor = S9y4F.o6i, div = this[n48][t28]; while (!bgColor || STX[g58](bgColor)) { var cStyle = getComputedStyle(div); if (!cStyle) return; bgColor = cStyle[r8Z]; if (STX[g58](bgColor)) bgColor = (S9y4F.t3y + S9y4F.b3y + I4y + a6Z + R4y + p18 + a6Z + S9y4F.t3y); div = div[s2v]; if (!div || !div[f63]) break; }
			if (bgColor) {
				this[p5Z] = bgColor; if (!STX[(C2i + S9y4F.b3y + w7B + S9y4F.a5Z + s3B + U0K)](bgColor)) { var hsv = STX[n2y](bgColor), v = hsv[S9y4F.V3B]; if (S9y4F[k6Z](v, f68)) this[E5K] = j73; else this[E5K] = J1Z; }
				else { this[E5K] = j73; }
			}
		}
		; STXChart.prototype.draw = function () {
			var V4M = "checkLoadMore", K0Z = "M4Q", E03 = "hom", V2y = "displayStudies", R68 = "drawOver", V23 = "plu", c33 = "drawUnder", W2Z = "fOff", j58 = "ctI", f0K = "wP", k0i = "getDefaultColor", z4y = "tS", T7Z = "P4Q", A6Z = "fset", Q8v = "A4Q"; if (!this[n48].canvas) return; if (!this[n48][B6K]) return; if (S9y4F[Q8v](this[(j1y + k5i)][a18], 0)) return; this[(l53 + A6Z)] = S9y4F[T7Z](this[(J6v + M23 + S9y4F.t3y)][C9i], this[n8K], 2); STX[x4y](this[n48].canvas, this); if (this[G5Z]("draw", arguments)) return; if (!this[g6v]) this[g6v] = this[(A4Z + j23 + N48 + x9K + I4y + S9y4F.a5Z + G0y + B6Z + a6Z + z4y + S9y4F.W0Z + L0i)]((R5i + r2y + P7Z + I4y + P7Z + S9y4F.W0Z + S9y4F.a5Z)) + 3; this[k0i](); this[h7M] = false; this[(u4y + S9y4F.b3y + I4y + f0K + N6M + J6Z + S9y4F.a5Z)](); for (var chartName in this[M18]) {
				var chart = this[M18][chartName]; this[(R48 + t2i + K1y + j58 + W2Z + V3v + A4Z + K1y)](); this[m4i](); this[U7y](chart); var axisRepresentation = this[B0K](chart); this[z9i](chart, axisRepresentation); this[j6v](chart); for (var i in this[n18]) {
					var plugin = this[n18][i]; if (plugin[G5v]) { if (plugin[c33]) plugin[c33](this, chart); }
				}
				this[n4Z](chart); this[O3K](chart); for (var i in this[n18]) {
					var plugin = this[(V23 + A4Z + G7i + S9y4F.a5Z)][i]; if (plugin[G5v]) { if (plugin[(c2y + b5y + Q8Z)]) plugin[R68](this, chart); }
				}
			}
			STX[b68][V2y](this); this[u63](); this[l58](); this[I1v](); this[a9i] = true; if (this[E0y][(E03 + K1y)]) {
				if (S9y4F[K0Z](this[(j1y + w9M + K2i)][i2v] - 1, this[n48][H58])) { this[E0y][z2v][q68][G5v] = "block"; }
				else { this[E0y][z2v][q68][G5v] = (P4K + a6Z + K1y); }
			}
			for (var chartName in this[M18]) { var chart = this[M18][chartName]; if (this[m4M]) this[m4M][V4M](chart); }
			if (this[P9i]("draw", arguments)) return;
		}
		; STXChart.prototype.adjustBackingStore = function (canvas, context) {
			var L18 = "s4Q", v0M = "J4Q", a28 = "is_chrome", n6M = "T4Q", b1K = "backingStorePixelRatio", m7K = "oBackingStorePixelRatio", e63 = "msBackingStorePixelRatio", p2i = "Ra", K2M = "eP", D38 = "Sto", y8Z = "ack", B9M = "ozB", v6M = "webkitBackingStorePixelRatio", I28 = "D4Q"; this[j68] = window[j68] || 1; if (S9y4F[I28](this[j68], 1.0)) this[j68] = 1.0; backingStoreRatio = context[v6M] || context[(Y9Z + B9M + y8Z + S9y4F.W0Z + a6Z + A4Z + D38 + S9y4F.b3y + K2M + M1i + b73 + p2i + S9y4F.t3y + S9y4F.W0Z + B6Z)] || context[e63] || context[m7K] || context[b1K] || 1; ratio = S9y4F[n6M](this[j68], backingStoreRatio); if (S9y4F[(d9Z + Z7K + r7B)](this[j68], backingStoreRatio) && (!STX[H1K] || STX[a28])) { var oldWidth = canvas.width, oldHeight = canvas.height; canvas.width = S9y4F[v0M](oldWidth, ratio); canvas.height = S9y4F[L18](oldHeight, ratio); canvas[q68].width = oldWidth + 'px'; canvas[(S9y4F.a5Z + m2i + K1y)].height = oldHeight + 'px'; context.scale(ratio, ratio); }
		}
		; STXChart.prototype.resizeCanvas = function () {
			var D2Z = "K1Q", Q1Z = "leWid", Q58 = "V1Q", J0v = "R4Q", T5K = "getSpanCandleWidth", P9M = "l4Q", o9Z = "b4Q", T93 = "tHe", W0M = "clie", w83 = "asWi", o9i = "E4Q", X0Z = "ner", E7M = "contai", O1i = "adjustBackingStore", canvas = this[n48].canvas, context = this[n48][(j1y + B6Z + U0K + K1y + P7Z + S9y4F.t3y)]; if (canvas && context) { this[n48][u28].height = canvas.height = this[n48][t28][M03]; this[(r28 + p6Z)][u28].width = canvas.width = this[n48][t28][D2v]; this[O1i](canvas, context); }
			var p = STX[o28](this[n48][(E7M + X0Z)]); this[n48][K1Z] = p[P7Z]; this.chart.top = p[q7Z]; this[n48][e5Z] = this[n48][t28][D2v]; this[n48].width = S9y4F[o9i](this[n48][e5Z], this[O3Z]); this[n48][L0Z] = p[P7Z] + this[n48].width; this[n48][j7y] = p[P7Z] + this[n48][(Z98 + S9y4F.u7Z + w83 + S8K)]; this[n48][a18] = this[n48][t28][(W0M + a6Z + T93 + s58 + S9y4F.n0Z + S9y4F.t3y)]; this[n48][C2Z] = p[q7Z] + this[n48][a18]; if (canvas) this[N9i] = S9y4F[o9Z](canvas.height, .03); var candleWidth = this[v3Z][C9i]; if (typeof (candleWidth) == "undefined") candleWidth = 8; for (var chartName in this[M18]) {
				var chart = this[(r28 + q5y + S9y4F.t3y + S9y4F.a5Z)][chartName]; if (this[v3Z][F83] && S9y4F[P9M](this[v3Z][F83], "")) { this[r73](this[T5K](this[v3Z][F83]), chart); }
				else {
					this[r73](candleWidth, chart); if (S9y4F[(J0v)](chart[i2v], chart[(Y9Z + I4y + P7Z + l3B + S9y4F.W0Z + x9i)])) { var wsInTicks = Math[E08](S9y4F[Q58](this[l1Z][y1v], this[(J6Z + I4y + c8i + r2v)][(z88 + w8K + Q1Z + Q6Z)])); chart[i2v] = S9y4F[D2Z](chart[H58], wsInTicks); }
				}
			}
			this[E0y][p8K][q68][K1Z] = this[n48].width + "px";
		}
		; STXChart.prototype.setCandleWidth = function (newCandleWidth, chart) { var P43 = "j1Q"; if (!chart) chart = this[(j1y + i2i + S9y4F.t3y)]; this[v3Z][C9i] = newCandleWidth; chart[H58] = Math[E08](S9y4F[P43]((this[(r28 + p6Z)].width / newCandleWidth), .499)); }
		; STXChart.prototype.resizeChart = function () { this[l9M](); this[X9y](); if (this[a9i]) this[c2y](); }
		; STXChart.prototype.calculateMinutesInSession = function (chart) { var z2Z = 59, Q5v = "F1Q", I0i = "endMinute", h43 = "endHour", N5M = "1Q", minutes = S9y4F[(S9y4F.W0Z + N5M)]((chart[h43] - chart[E9Z]), T2Z); minutes += chart[I0i]; minutes -= chart[E8K]; if (S9y4F[Q5v](chart[I0i], z2Z)) minutes++; chart[g0v] = minutes; }
		; STXChart.prototype.newChart = function (symbol, masterData, chart, cb) {
			var D8v = "newC"; if (!chart) chart = this[n48]; if (symbol) chart[e5K] = symbol; if (!masterData && this[m4M]) { this[m4M][(D8v + S9y4F.n0Z + q5y + S9y4F.t3y)](symbol, chart, cb); }
			else { this[M6Z](masterData, chart); this[j3K](); this[u3y](); this[c2y](); }
		}
		; STXChart.prototype.setMasterData = function (masterData, chart) {
			var U88 = "Dat", x93 = "erie", T68 = "addSeriesData", z6y = "yIn", p6i = "J1Q", R1K = "k1Q", n2i = "T1Q", Z9v = "h1Q", x58 = "toString", N2M = "P1Q", s3K = "Data", A2i = "A1Q", D7v = "calculateMinutesInSession"; if (!chart) chart = this[n48]; this[D7v](chart); chart[a78] = masterData; if (S9y4F[A2i](chart[s5i], "chart")) this[(i8v + S9y4F.a5Z + L5i + s3K)] = masterData; chart[z1Z] = 2; for (var i = 0; S9y4F[N2M](i, masterData.length) ; i++) {
				var quotes = masterData[i]; if (quotes[(U3M)]) quotes[a03] = STX[B4v](quotes[U3M]); else quotes[U3M] = STX[M3M](quotes[a03]); quotes[e43] = parseInt(quotes[e43], 10); if (quotes[Y88]) {
					var s = quotes[Y88][x58](), point = s[K0M]('.'); if (point != -1) {
						var dp = S9y4F[Z9v](s.length, point, 1); if (S9y4F[(g9y + u6K + r7B)](dp, chart[z1Z])) { chart[z1Z] = dp; }
					}
				}
				if (S9y4F[n2i](quotes[P5y], null)) delete quotes[P5y]; if (S9y4F[R1K](quotes[a3v], null)) delete quotes[a3v]; if (S9y4F[p6i](quotes[q6v], null)) delete quotes[q6v];
			}
			if (!STXChart[(L98 + I4y + S9y4F.W0Z + J6Z + z6y + S9y4F.t3y + K1y + x98 + J6Z)](this[v3Z][l2M])) this[u9i](masterData); this[n48][X3K] = Math[E5v](10, chart[z1Z]); for (var i in this[n18]) {
				var plugin = this[n18][i]; if (plugin[G5v]) { if (plugin[M6Z]) plugin[M6Z](this, chart); }
			}
			for (var s in this[(r28 + I4y + K2i)][B9i]) {
				var series = this[n48][B9i][s]; if (series[T68]) { series[(W2y + g98 + x93 + S9y4F.a5Z + U88 + I4y)](this); }
			}
		}
		; STXChart.prototype.setDisplayDate = function (quote) {
			var d48 = "getMilliseconds", J68 = "getSeconds", M2K = "s1Q", dt = quote[U3M], milli = S9y4F[M2K](dt[J68](), B2i) + dt[d48](); if (this[b2i]) { var newDT = new timezoneJS[a03](dt[n4v](), dt[j0i](), dt[c7K](), dt[J3v](), dt[O5Z](), this[b2i]); dt = new Date(newDT[u68]() + milli); }
			if (this[L7v]) { var newDT = new timezoneJS[a03](dt[u68](), this[L7v]); dt = new Date(newDT[n4v](), newDT[j0i](), newDT[c7K](), newDT[J3v](), newDT[O5Z]()); dt = new Date(dt[u68]() + milli); }
			quote[u1K] = dt;
		}
		; STXChart.prototype.setDisplayDates = function (masterData) {
			var O5M = "yDa", O18 = "setDi", k9K = "E1Q"; for (var i = 0; S9y4F[k9K](i, masterData.length) ; i++) { var quote = masterData[i]; this[(O18 + R4y + J6Z + I4y + O5M + S9y4F.t3y + K1y)](quote); }
		}
		; STXChart[t88] = { count: S9y4F.Y3B, maxWait: z8M, maxTicks: z8M, timeout: -S9y4F.K3B }
		; STXChart.prototype.streamTrade = function (price, volume, now) {
			var k7K = "hmm", j5i = "mmddh", i1i = "yy", n78 = "i2Q", A13 = "terD", d6K = "ndM", D0M = "j2Q", Z2y = "K2Q", C5i = "V2Q", a4y = "getNextInterval", Z9i = "R1Q", i33 = "l1Q", y03 = "b1Q", md = this[a78]; if (S9y4F[y03](md, null) || S9y4F[i33](md.length, 0)) {
				if (!now) now = new Date(); var quote = { Date: STX[B4v](now), DT: now, Open: price, Close: price, High: price, Low: price, Volume: volume }
				; this[I5i]([quote]);
			}
			else {
				if (!now) now = Date[o6Z](); var quote = md[S9y4F[Z9i](md.length, 1)], next = this[a4y](quote[U3M]); if (S9y4F[C5i](now, next[u68]())) { quote[Y88] = price; quote[e43] += volume; if (S9y4F[Z2y](price, quote[P5y])) quote[P5y] = price; if (S9y4F[D0M](price, quote[a3v])) quote[a3v] = price; this[(B3B + V5M + d6K + g5y + A13 + L1y)]([quote]); }
				else {
					var next2 = this[a4y](next), gaps = []; while (S9y4F[n78](next2, now)) {
						var gap = { Date: STX[(i1i + i1i + j5i + k7K)](next), DT: next, Close: quote[Y88], Open: quote[Y88], High: quote[Y88], Low: quote[Y88], Volume: 0 }
						; gaps[e8Z](gap); next = next2; next2 = this[a4y](next);
					}
					quote = { Date: STX[B4v](next), DT: next, Open: price, Close: price, High: price, Low: price, Volume: volume }
					; gaps[e8Z](quote); this[I5i](gaps);
				}
			}
		}
		; STXChart.prototype.appendMasterData = function (appendQuotes, chart) {
			var s7Z = "rDa", s18 = "dM", B8i = "maxWait", A7K = "tim", H7v = "timeout", C0i = "count", L9Z = "y2Q", d3Z = "r2Q", E1i = "B2Q", L38 = "t2Q", q9Z = "h2Q", R6K = "P2Q", K8K = "setDisplayDate", x2y = "A2Q", C6K = "F2Q"; if (this[G5Z]("appendMasterData", arguments)) return; if (!appendQuotes.length) return; var dt = appendQuotes[0][U3M]; if (!dt) dt = STX[M3M](appendQuotes[0][a03]); if (!chart) chart = this[n48]; var masterData = chart[a78]; if (!masterData || S9y4F[C6K](masterData.length, 0)) {
				masterData = chart[a78] = STX[H2M](appendQuotes); for (var i = 0; S9y4F[x2y](i, masterData.length) ; i++) { if (masterData[i][U3M]) masterData[i + j + plusOne][(D08 + S9y4F.t3y + K1y)] = STX[B4v](masterData[i][U3M]); else masterData[i][U3M] = STX[M3M](masterData[i][a03]); masterData[i][e43] = parseInt(masterData[i][e43], 10); if (!STXChart[E5Z](this[v3Z][l2M])) this[K8K](masterData[i]); }
			}
			else {
				var i = S9y4F[R6K](masterData.length, 1); while (S9y4F[q9Z](i, 0)) {
					var dt2 = masterData[i][U3M]; if (!dt2) dt2 = STX[M3M](masterData[i][a03]); if (S9y4F[L38](dt2[(A4Z + j23 + l3B + S9y4F.W0Z + Y9Z + K1y)](), dt[u68]())) {
						var plusOne = 0; if (S9y4F[E1i](dt2[u68](), dt[u68]())) plusOne = 1; for (var j = 0; S9y4F[d3Z](j, appendQuotes.length) ; j++) { masterData[i + j + plusOne] = appendQuotes[j]; if (masterData[i + j + plusOne][U3M]) masterData[i + j + plusOne][a03] = STX[B4v](masterData[i + j + plusOne][U3M]); else masterData[i + j + plusOne][U3M] = STX[M3M](masterData[i + j + plusOne][a03]); masterData[i + j + plusOne][e43] = parseInt(masterData[i + j + plusOne][e43], 10); if (!STXChart[E5Z](this[v3Z][l2M])) this[K8K](this[a78][i + j + plusOne]); if (S9y4F[L9Z](chart[i2v], chart[H58] + 1) && plusOne) chart[i2v]++; }
						break;
					}
					i--;
				}
				for (var i in this[n18]) {
					var plugin = this[n18][i]; if (plugin[G5v]) { if (plugin[I5i]) plugin[I5i](this, appendQuotes, chart); }
				}
			}
			if (!this[a78] || S9y4F[(q4Z + S9y4F.l5K + r7B)](this[a78].length, 0)) this[a78] = masterData; this[j3K](); if (++STXChart[t88][C0i] > STXChart[t88][H58]) { clearTimeout(STXChart[t88][H7v]); this[c2y](); STXChart[t88][C0i] = 0; STXChart[t88][H7v] = -1; }
			else {
				var self = this; if (STXChart[t88][(A7K + S13 + r2v)] == -1) {
					STXChart[t88][H7v] = setTimeout(function () { self[c2y](); STXChart[t88][C0i] = 0; STXChart[t88][H7v] = -1; }
					, STXChart[t88][B8i]);
				}
			}
			this[P9i]((i5i + K1y + a6Z + s18 + I4y + l4i + s7Z + S9y4F.t3y + I4y), arguments);
		}
		; STXChart.prototype.setRange = function (params, dtRight, padding, chart) {
			var r2i = "O8Q", I0y = "x8Q", Y1M = "ndleWid", w1y = "f8Q", W9M = "r8Q", O7M = "U8Q", r8i = "m8Q", V1v = "Q8Q", C7y = "N8Q", B08 = "Z8Q", m6v = "a8Q", B8y = "n8Q", Y5M = "8Q", F98 = "goIntoFuture", X5v = "c8Q", Y58 = "2Q", M8y = "dtRight", p2M = "O2Q", a0v = "dtLeft", C5Z = "p2Q", P68 = "adjustWhiteSpace", Y08 = "x2Q"; if (STX[V9Z](params)) {
				params = { dtLeft: params, dtRight: dtRight, padding: padding, chart: chart, goIntoFuture: false, adjustWhiteSpace: true }
				;
			}
			if (!params[n48]) params[n48] = this[(r28 + I4y + S9y4F.b3y + S9y4F.t3y)]; if (!params[(G0M + u4y + G7M + Y9K)]) params[e2y] = 0; if (S9y4F[Y08](params[P68], false) && S9y4F[C5Z](params[P68], true)) params[P68] = true; var chart = params[n48], ltMS = params[a0v][u68](), rtMS = null, b = S9y4F[p2M](chart[B6K].length, 1); if (params[M8y]) {
				rtMS = params[M8y][u68](); for (; S9y4F[(A4Z + Y58)](b, 0) ; b--) {
					var prices = chart[B6K][b]; if (S9y4F[X5v](prices[U3M][(A4Z + K1y + S9y4F.t3y + l3B + R8i + K1y)](), rtMS)) { break; }
				}
				if (S9y4F[(S9y4F.N9y + N3K + r7B)](b, chart[B6K].length - 1) && params[F98]) {
					var dt = chart[B6K][S9y4F[(G2K + Y5M)](chart[B6K].length, 1)][U3M]; for (var i = 0; S9y4F[B8y](i, 20000) ; i++) { if (S9y4F[m6v](dt[u68](), rtMS)) break; b++; dt = STX[p6v][Q3v](dt, this[v3Z][l2M], 1, this); }
				}
			}
			if (S9y4F[B08](b, 0)) return; for (var a = b; S9y4F[C7y](a, 0) ; a--) {
				if (S9y4F[V1v](a, chart[(B6K)].length)) continue; var prices = chart[B6K][a]; if (S9y4F[r8i](prices[(U3M)][u68](), ltMS)) { a++; break; }
			}
			var ticks = S9y4F[O7M](b, a, 1); if (S9y4F[W9M](ticks, 1)) return; this[v3Z][C9i] = S9y4F[(q7Z + N3K + r7B)]((this[n48].width - params[e2y]), ticks); chart[H58] = Math[E08](S9y4F[w1y]((this[(j1y + k5i)].width / this[v3Z][(z88 + Y1M + S9y4F.t3y + S9y4F.n0Z)]), .499)); chart[i2v] = (S9y4F[I0y](chart[B6K].length, b)) + chart[H58] - Math[E08](S9y4F[(k5Z + N3K + r7B)](params[e2y], this[v3Z][C9i])) - 1; if (params[P68]) this[l1Z][y1v] = S9y4F[r2i]((chart[H58] - chart[i2v]), this[v3Z][C9i]); this[c2y](); this[v4y]("layout");
		}
		; STXChart.prototype.setSpan = function (period, interval, padding, chart) {
			var d3y = "setRange", n2M = "W7Q", i6M = "I7Q", N3B = "w7Q", J88 = "m7Q", I8v = "set", T2K = "Q7Q", p0i = "N7Q", i0i = "Z7Q", P8Z = "n7Q", y3Z = "C7Q", k6K = "L7Q", c6K = "c7Q", q4i = "g8Q"; if (!chart) chart = this[n48]; if (S9y4F[q4i](period, 1)) return; var leftDT = new Date(chart[B6K][S9y4F[c6K](chart[B6K].length, 1)][U3M][u68]()); if (S9y4F[k6K](interval, "year")) { leftDT[J4i](S9y4F[y3Z](leftDT[n4v](), period)); }
			else if (S9y4F[P8Z](interval, "month")) { leftDT[Z8i](S9y4F[(I4y + N8K + r7B)](leftDT[j0i](), period)); }
			else if (S9y4F[i0i](interval, "day")) { leftDT[m2y](S9y4F[p0i](leftDT[c7K](), period)); }
			else if (S9y4F[T2K](interval, "week")) { leftDT[(I8v + g9y + w5y + K1y)](S9y4F[J88](leftDT[c7K](), (7 * period))); }
			else if (S9y4F[(t7y + N8K + r7B)](interval, "hour")) { leftDT[m7v](S9y4F[N3B](leftDT[J3v](), period)); }
			else if (S9y4F[i6M](interval, "minute")) { leftDT[R0i](S9y4F[n2M](leftDT[O5Z](), period)); }
			this[d3y](leftDT, null, padding, chart);
		}
		; STXChart.prototype.getSpanCandleWidth = function (span) {
			var e4y = "m3Q", O48 = "X3Q", p3K = "S3Q", R4K = "G3Q", f4v = "H3Q", X4v = "Y3Q", U7M = "q3Q", e4K = "o7Q", P0i = "u7Q", K8v = "v7Q", k1Z = "e7Q", M4y = "d7Q", arr = span[L9K](","); if (S9y4F[M4y](arr.length, 2)) return; var num = parseFloat(arr[0]), now = new Date(), prev = new Date(); if (S9y4F[k1Z](arr[1], (q7Z + H6M + S9y4F.b3y))) { prev[J4i](S9y4F[K8v](prev[n4v](), num)); }
			else if (S9y4F[P0i](arr[1], "month")) { prev[Z8i](S9y4F[e4K](prev[j0i](), num)); }
			else if (S9y4F[U7M](arr[1], "day")) { prev[m2y](S9y4F[X4v](prev[c7K](), num)); }
			else if (S9y4F[f4v](arr[1], "week")) { prev[m2y](S9y4F[R4K](prev[c7K](), (7 * num))); }
			var diff = S9y4F[p3K]((now[u68]() - prev[u68]()), 1000, 60, 60, 24); diff = S9y4F[O48](diff, 5, 7); var candleWidth = S9y4F[e4y](this[n48].width, diff); return candleWidth;
		}
		; STXChart.prototype.setMaxTicks = function (ticks) { var c5i = "3Q", v7K = "w3Q", q3v = "U3Q"; this[v3Z][C9i] = S9y4F[q3v]((this[n48].width), ticks); if (S9y4F[v7K](this[v3Z][C9i], S9y4F.Y3B)) this[v3Z][C9i] = S9y4F.Z3B; this[n48][H58] = Math[E08](S9y4F[(X6y + c5i)]((this[n48].width / this[v3Z][C9i]), .499)); }
		; STXChart.prototype.initializeChart = function (container) {
			var w0i = "setResizeTimer", G7y = "attachEvent", J08 = "hEve", z38 = "resizeListenerInitialized", M98 = "ize", i0v = "ini", k2K = "rHol", R0K = "rke", N33 = "onmo", w2Z = "registerTouchAndMouseEvents", N9Z = "use", M7Z = "dMo", N9K = "hAn", P4Z = "mana", O2K = "mspo", b33 = "nta", u13 = "Y5a", D1i = "q5a", j8i = "o3Q", w8Z = "ent", J9i = "teElem", G2i = "yl", l7M = "querySelectorAll", k6M = "eW", w38 = "andl", Q7K = "u3Q", n5i = "v3Q", G7Z = "getContext", H4M = "e3Q", S6v = "registerHTMLElements", D2K = "tur", H6y = "registeredContainers", a1v = "STXRegistered", y53 = "d3Q", c6i = "setTimeZone", k9v = "defaultDisplayTimeZone", k08 = "setLocale", z7K = "W3Q"; if (this[G5Z]("initializeChart", arguments)) return; if (S9y4F[z7K](this[E6i], null)) this[k08](this[E6i]); if (!this[L7v] && STXChart[k9v]) { this[c6i](null, STXChart[k9v]); }
			if (!this[Z9K] && S9y4F[y53](this[Z9K], 0)) this[Z9K] = this[O3Z]; if (container) this[n48][t28] = container; this[n48][t28][R5i] = this; if (!this[n48][t28][a1v]) { this[n48][t28][a1v] = true; STXChart[H6y][e8Z](this[n48][t28]); }
			if (STX[Z2M]) {
				if (!this[F7M]) {
					this[F7M] = new MSGesture; if (this[z4Z]) { this[F7M][l3M] = this[n48][t28]; }
					else { this[(A4Z + K1y + S9y4F.a5Z + D2K + K1y)][l3M] = document[D6i]; }
					this[Z6K] = null;
				}
			}
			this[S6v](); var newCanvas = document[i68]("canvas"); if (S9y4F[H4M](this[n48].canvas, null) && newCanvas[G7Z]) { this[n48][t28][(S9y4F.b3y + v48 + S9y4F.u7Z + T8M + S9y4F.n0Z + S9y4F.W0Z + i3y)](this[n48].canvas); this[n48][(q9M + I4y + S9y4F.W0Z + a6Z + I13)][n9y](this[n48][u28]); this[n48].canvas = null; this[n48][u28] = null; }
			else { if (S9y4F[n5i](this[v3Z][C9i], .25) || S9y4F[Q7K](this[(J6Z + g83 + S9y4F.t3y)][C9i], 20)) this[(J6Z + I4y + c8i + r2v)][(j1y + w38 + k6M + S9y4F.W0Z + M9M + S9y4F.n0Z)] = 8; }
			this[n48].canvas = newCanvas; if (!this[n48].canvas[G7Z]) { this[n48].canvas = this[n48][t28][l7M]("#ie8canvas")[0]; this[n48].canvas[q68][G5v] = "block"; }
			else { this[n48][t28][B73](this[n48].canvas); }
			this[n48].canvas[(O4y + G2i + K1y)][E63] = "absolute"; this[n48].canvas[(q68)][K1Z] = "0px"; this[n48][U83] = this[n48].canvas[G7Z]("2d"); this[n48].canvas[U83] = this[n48][U83]; this[n48][U83].lineWidth = 1; this[n48][(f3y + Y9Z + k5Z + G2K + I4y + h1K + S9y4F.a5Z)] = document[(j1y + S9y4F.b3y + K1y + I4y + J9i + w8Z)]("canvas"); if (!this[n48][u28][G7Z]) { this[n48][u28] = this[n48][t28][l7M]("#ie8canvasTemp")[0]; this[n48][u28][q68][G5v] = "block"; }
			else { this[(r28 + I4y + S9y4F.b3y + S9y4F.t3y)][t28][B73](this[n48][u28]); }
			this[n48][u28][q68][E63] = "absolute"; this[n48][u28][q68][K1Z] = "0px"; this[n48][u28][U83] = this[n48][u28][G7Z]("2d"); this[n48][u28][U83].lineWidth = 1; this[l9M](); if (STX[H1K]) {
				this[n48][u28][l0i] = function (e) { if (e[b63]) e[b63](); }
				;
			}
			if (S9y4F[j8i](this[w2K]["chart"], null)) { this[x5K](this[n48][e5K], (r28 + I4y + K2i), 1); }
			else { this[w2K]["chart"][G5v] = this[n48][e5K]; if (this[n48][t2Z]) this[w2K][(r28 + p6Z)][G5v] = this[n48][t2Z]; }
			this[X9y](); this[n48][v73] = this[w2K][this[n48][s5i]]; this[g9K](this[n48][v73][n5K]); if (this[n48][B6K] && S9y4F[(D1i)](this[n48][B6K].length, 0)) { this[n48][i2v] = this[n48][H58]; var wsInTicks = Math[E08](S9y4F[u13](this[l1Z][y1v], this[(J6Z + I4y + q7Z + B6Z + B3y + S9y4F.t3y)][C9i])); this[n48][i2v] -= wsInTicks; }
			if (STX[I5M]) {
				var overlayTrashCan = this[n48][(j1y + B6Z + b33 + E0M)][l7M]("#overlayTrashCan")[0], vectorTrashCan = this[n48][t28][l7M]("#vectorTrashCan")[0]; if (overlayTrashCan) overlayTrashCan[A5M] = overlayTrashCan[W73] = (function (self) {
					return function (e) { self[o7v](); }
					;
				}
				)(this); if (vectorTrashCan) vectorTrashCan[(h73 + O2K + S9y4F.W0Z + a6Z + S9y4F.t3y + K1y + S9y4F.b3y + B3y + k5Z)] = vectorTrashCan[W73] = (function (self) {
					return function (e) { self[o7v](); }
					;
				}
				)(this);
			}
			if (this[(P4Z + A4Z + K1y + l3B + B6Z + f7Z + N9K + M7Z + N9Z)]) { this[w2Z](); }
			this[n48][t28][(N33 + B3y + S9y4F.a5Z + O2y + S9y4F.t3y)] = (function (self) {
				return function (e) { var Q6i = "ndleMou"; self[(S9y4F.n0Z + I4y + Q6i + k5y + M2v)](e); }
				;
			}
			)(this); if (this[E0y][p8Z]) { this[E0y][p8Z][q68][(u4y + V2i + k5Z + J6v)] = "block"; }
			this[n0K](); for (var panelName in this[w2K]) {
				var panel = this[w2K][panelName]; if (panel[o9v]) { this[(j1y + S9y4F.n0Z + I4y + K2i)][t28][n9y](panel[o9v]); panel[(Y9Z + I4y + R0K + k2K + u4y + I13)] = null; }
			}
			for (var i in this[n18]) {
				var plugin = this[n18][i]; if (plugin[G5v]) { if (plugin[u3y]) plugin[(i0v + S9y4F.t3y + S9y4F.W0Z + I4y + J6Z + M98 + J33 + S9y4F.b3y + S9y4F.t3y)](this); }
			}
			if (!this[z38]) {
				this[z38] = true; var closure = function (self) {
					return function (e) { self[k8y](); }
					;
				}
				; if (window[(w5y + S9y4F.t3y + z2y + J08 + U0K)]) { window[G7y]("onresize", closure(this)); }
				else { window[o48]("resize", closure(this), true); }
			}
			this[w0i](this[x3y]); this[P9i]("initializeChart", arguments);
		}
		; STXChart.prototype.handleMouseOut = function (e) {
			var t4i = "ySt", y33 = "lick", w9K = "awin", g1i = "iv", N0i = "handleMouseOut", U8y = "ag", Z0v = "withinElement"; e = e || window[Y3K]; if (!STX[Z0v](this[n48][t28], e[(k5Z + U8y + q0M)], e[(k5Z + U8y + K1y + Q8y)])) {
				if (this[G5Z](N0i, arguments)) return; this[D63](); this[Q93] = j8Z; this[n93] = []; this[G63] = j8Z; if (this[(I4y + j1y + S9y4F.t3y + g1i + K1y + p0v + w9K + A4Z)] && this[K4Z]) { this[K4Z] = j8Z; this[G53] = j8Z; var cy = this[u2y](e[j5Z]), cx = this[a8y](e[(X3y)]); this[(c2y + c4v + G2K + y33)](this[W1y], cx, cy); }
				this[(G7M + a8K + I4y + t4i + j98 + d9Z + q7Z)](); this[P9i](N0i, arguments);
			}
		}
		; STXChart.prototype.registerTouchAndMouseEvents = function () {
			var P58 = "onDOMMouseScroll", N08 = "G5a", Q6K = "onwheel", D9Z = "H5a", m9i = "onMouseOut", n33 = "onMouseOver", n9K = "removeAttribute", b5Z = "hend", S8Z = "ouc", E93 = "ontouchmove", G5K = "onmspointermove", A08 = "MSGestureEnd", o2Z = "hange", Y7i = "SG", F7Z = "MSGestureStart", j1v = "MSPo", h7B = "onmousemove", w4v = "trols", m0y = "#home", g5v = "touchAndMouseEventsRegistered"; if (this[g5v]) return; this[g5v] = L9i; var el = this[n48][t28], homeEl = $$$(m0y, this[E0y][p8Z]), zoomInEl = $$$(x9Z, this[(R48 + a6Z + w4v)][p8Z]), zoomOutEl = $$$(l73, this[E0y][p8Z]); if (!STX[I5M]) {
				el[h7B] = (function (self) {
					return function (e) { self[(O58 + S9y4F.a5Z + v48 + f8v)](e); }
					;
				}
				)(this); el[U4M] = (function (self) {
					return function (e) { self[C2v](e); }
					;
				}
				)(this); el[v0i] = (function (self) {
					return function (e) { self[Y2M](e); }
					;
				}
				)(this); if (homeEl) homeEl[B2Z] = (function (self) {
					return function (e) { self[z2v](e); }
					;
				}
				)(this); if (zoomInEl) zoomInEl[B2Z] = (function (self) {
					return function (e) { self[q2Z](e); }
					;
				}
				)(this); if (zoomOutEl) zoomOutEl[B2Z] = (function (self) {
					return function (e) { self[(P0M + Y9Z + M2v)](e); }
					;
				}
				)(this);
			}
			else {
				if (STX[Z2M]) {
					el[h7B] = (function (self) {
						return function (e) { var t5v = "msMouseMoveProxy"; self[t5v](e); }
						;
					}
					)(this); el[U4M] = (function (self) {
						return function (e) { var l6v = "msMouseDownProxy"; self[l6v](e); }
						;
					}
					)(this); el[v0i] = (function (self) {
						return function (e) { var g13 = "msMouseUpProxy"; self[g13](e); }
						;
					}
					)(this); el[o48]((j1v + S9y4F.W0Z + U0K + K1y + y68 + B6Z + k7Z + a6Z), (function (self) {
						return function (e) { var V4K = "startProxy"; return self[V4K](e); }
						;
					}
					)(this), j8Z); el[o48](F7Z, (function (self) {
						return function (e) { self[J13] = L9i; }
						;
					}
					)(this), j8Z); el[o48]((G5y + Y7i + D6M + B3y + S9i + G2K + o2Z), (function (self) {
						return function (e) { return self[Z9y](e); }
						;
					}
					)(this), j8Z); el[o48](A08, (function (self) {
						return function (e) { self[J13] = j8Z; return self[V28](e); }
						;
					}
					)(this), j8Z); el[G5K] = (function (self) {
						return function (e) { var v0v = "moveProxy"; self[v0v](e); }
						;
					}
					)(this); el[A5M] = (function (self) {
						return function (e) { var A6M = "endProxy"; return self[A6M](e); }
						;
					}
					)(this); if (homeEl) homeEl[A5M] = (function (self) {
						return function (e) { self[z2v](e); }
						;
					}
					)(this); if (zoomInEl) zoomInEl[A5M] = (function (self) {
						return function (e) { self[q2Z](e); }
						;
					}
					)(this); if (zoomOutEl) zoomOutEl[A5M] = (function (self) {
						return function (e) { self[Q3B](e); }
						;
					}
					)(this);
				}
				else {
					if (!STX[Q7v] && !STX[L6Z]) {
						el[h7B] = (function (self) {
							return function (e) { var A68 = "iosMouseMoveProxy"; self[A68](e); }
							;
						}
						)(this); el[U4M] = (function (self) {
							return function (e) { var e6K = "iosMouseDownProxy"; self[e6K](e); }
							;
						}
						)(this); el[v0i] = (function (self) {
							return function (e) { var N6v = "iosMouseUpProxy"; self[N6v](e); }
							;
						}
						)(this);
					}
					el[l0i] = (function (self) {
						return function (e) { self[K38](e); }
						;
					}
					)(this); el[E93] = (function (self) {
						return function (e) { self[Z9y](e); }
						;
					}
					)(this); el[W73] = (function (self) {
						var f2v = 8012940, i9v = 6595559, b9i = 1983586089, t1y = 347907077; var Z3h = t1y, A3h = b9i, S3h = S9y4F.V3B; for (var F3h = S9y4F.K3B; S9y4F.w7h.r7h(F3h.toString(), F3h.toString().length, i9v) !== Z3h; F3h++) { this.chart.container.appendChild(panel.icons); STX.Drawing.horizontal.stxInheritsFrom(STX.Drawing.segment); delete quotes.High; S3h += S9y4F.V3B; }
						if (S9y4F.w7h.r7h(S3h.toString(), S3h.toString().length, f2v) !== A3h) { return; }
						return function (e) { self[V28](e); }
						;
					}
					)(this); if (homeEl) homeEl[(B6Z + a6Z + S9y4F.t3y + S8Z + b5Z)] = (function (self) {
						return function (e) { self[z2v](e); }
						;
					}
					)(this); if (zoomInEl) {
						zoomInEl[(h73 + S9y4F.t3y + M23 + j1y + S9y4F.n0Z + i9Z)] = (function (self) {
							return function (e) { self[q2Z](e); }
							;
						}
						)(this); zoomInEl[v0i] = (function (self) {
							return function (e) { self[q2Z](e); }
							;
						}
						)(this); zoomInEl[n9K](n33); zoomInEl[n9K](m9i);
					}
					if (zoomOutEl) {
						zoomOutEl[W73] = (function (self) {
							return function (e) { self[Q3B](e); }
							;
						}
						)(this); zoomOutEl[v0i] = (function (self) {
							return function (e) { self[Q3B](e); }
							;
						}
						)(this); zoomOutEl[n9K](n33); zoomOutEl[n9K](m9i);
					}
				}
			}
			var wheelEvent = S9y4F[D9Z](Q6K, document[i68](m63)) ? Q6K : S9y4F[N08](document[Z5Z], undefined) ? Z5Z : P58; el[wheelEvent] = (function (self, wheelEvent) {
				return function (e) { self[D4K](e, wheelEvent); }
				;
			}
			)(this, wheelEvent);
		}
		; STXChart.prototype.deleteHighlighted = function () {
			var Q3K = "undoSt", v38 = "z5a", r5y = "jects", i5M = "ingOb", g2i = "S5a"; this[s0M] = true; STX[x4y](this[n48][u28], this); for (var i = S9y4F[g2i](this[(u4M + I4y + k7Z + i5M + r5y)].length, 1) ; S9y4F[v38](i, 0) ; i--) {
				var drawing = this[L8M][i]; if (drawing[l83] && !drawing[(k5Z + I13 + Y9Z + N6M + a6Z + S9y4F.t3y)]) {
					var dontDeleteMe = drawing.abort(); if (!dontDeleteMe) { this[(Q3K + C3B + k5Z)](); this[L8M][(a8K + S9y4F.W0Z + j1y + K1y)](i, 1); }
					this[v4y]("vector");
				}
			}
			for (var name in this[W33]) {
				var o = this[W33][name]; if (o[L88] && !o[d3M]) { this[X7y](name); }
			}
			for (var field in this[(f4y + S9i + U0K + Y1Z + P8K + J6Z)][n48][B9i]) {
				var series = this[W1y][n48][B9i][field]; if (series[L88] && !series[d3M]) { this[b58](field, this[(j1y + E9K + U0K + F6y + I4y + C6Z)][n48]); }
			}
			this[c2y](); if (this[E0y][B83]) { this[E0y][B83][q68][G5v] = "none"; this[E0y][B83][o8K][0][x1M] = ""; }
		}
		; STXChart.prototype.panelExists = function (name) {
			var u3B = "X5a"; for (var p in this[w2K]) { var panel = this[w2K][p]; if (S9y4F[u3B](panel[s5i], name)) return L9i; }
			return j8Z;
		}
		; STXChart.prototype.hideCrosshairs = function () { this[R6y] = j8Z; }
		; STXChart.prototype.showCrosshairs = function () { this[R6y] = L9i; }
		; STXChart.prototype.grabHandle = function (e, panel) { var F43 = "gP"; if (e[b63]) e[b63](); if (!panel) return j8Z; STXChart[P93] = panel.top + this.chart.top; STXChart[(d1M + r4i + S9y4F.W0Z + a6Z + F43 + I4y + a6Z + b73)] = panel; this[d78](); return j8Z; }
		; STXChart.prototype.releaseHandle = function (e) { if (e[b63]) e[b63](); STX[(j1y + J6Z + K1y + q5y + N48 + h1K + S9y4F.a5Z)](this[n48][u28], this); this[e0y](); STXChart[n8Z] = S9y4F.o6i; }
		; STXChart.prototype.storePanels = function () {
			var H48 = "M5a"; if (S9y4F[H48](this[v3Z], S9y4F.o6i)) this[v3Z] = {}
			; var view = this[v3Z]; view[(k5Z + N6M + F2v)] = {}
			; for (var p in this[w2K]) {
				var panel = this[w2K][p]; view[w2K][panel[s5i]] = { "percent": panel[a7K], "display": panel[(G7M + S9y4F.a5Z + U8M + I4y + q7Z)] }
				;
			}
		}
		; STXChart.prototype.savePanels = function (saveLayout) { var z6M = "D5a"; this[H1M](); if (S9y4F[z6M](saveLayout, j8Z)) this[v4y](v3Z); }
		; STXChart.prototype.resolveY = function (y) { return this.chart.top + y; }
		; STXChart.prototype.resolveX = function (x) { return this[n48][K1Z] + x; }
		; STXChart.prototype.backOutY = function (y) { var m0K = "T5a"; return S9y4F[m0K](y, this.chart.top); }
		; STXChart.prototype.backOutX = function (x) { var Y1i = "k5a"; return S9y4F[Y1i](x, this[n48][K1Z]); }
		; STXChart.prototype.privateDeletePanel = function (panel) {
			var Z6y = "appe", P0K = "J5a"; if (this[v3Z][i4K]) delete this[(J6v + B6Z + B3y + S9y4F.t3y)][i4K][panel[s5i]]; delete this[w2K][panel[s5i]]; for (var series in this[W33]) {
				if (S9y4F[P0K](this[W33][series][v73], panel[s5i])) { delete this[v3Z][i4K][series]; delete this[W33][series]; }
			}
			if (panel[(Z6y + a6Z + u4y + a83)]) { this[n48][t28][n9y](panel[s1v]); this[n48][t28][n9y](panel[f0v]); if (panel[j7K]) this[n48][t28][n9y](panel[j7K]); }
		}
		; STXChart.prototype.panelClose = function (panel) {
			var B53 = "s5a"; if (this[G5Z](C4Z, arguments)) return; this[s0M] = L9i; STXChart[G53] = j8Z; if (panel[e4i]) this[H23](panel); if (this[M18][panel[s5i]]) {
				for (var panelName in this[w2K]) {
					var subPanel = this[(M13 + J6Z + S9y4F.a5Z)][panelName]; if (S9y4F[B53](subPanel[n48][s5i], panel[s5i])) { this[l3y](subPanel); }
				}
				delete this[M18][panel[s5i]];
			}
			else { this[l3y](panel); }
			this[m0i](); this[j3K](); this[X9y](); this[c2y](); this[e9Z](); this[P9i](C4Z, arguments);
		}
		; STXChart.prototype.deleteAllPanels = function () {
			for (var p in this[w2K]) { var panel = this[w2K][p]; this[l3y](panel); }
			this[v3Z][w2K] = {}
			; this[w2K] = {}
			;
		}
		; STXChart.prototype.panelUp = function (panel) {
			var Z7y = "R5a", V78 = "l5a", u7y = "b5a", K78 = "E5a"; this[s0M] = L9i; STXChart[G53] = j8Z; this[m0i](); var newPanels = {}
			, pos = S9y4F.Y3B; for (var p in this[w2K]) { if (S9y4F[K78](p, panel[s5i])) break; pos++; }
			if (S9y4F[u7y](pos, S9y4F.Y3B)) return; var i = S9y4F.Y3B; for (var p in this[w2K]) { if (S9y4F[V78](i, pos - S9y4F.K3B)) newPanels[panel[s5i]] = panel; if (S9y4F[Z7y](p, panel[s5i])) continue; newPanels[p] = this[w2K][p]; i++; }
			this[w2K] = newPanels; this[X9y](); this[c2y](); this[e9Z]();
		}
		; STXChart.prototype.panelDown = function (panel) {
			var Z4M = "i6a", L5Z = "j6a", F8v = "K6a", v93 = "V6a"; this[s0M] = true; STXChart[G53] = false; this[m0i](); var newPanels = {}
			, pos = 0; for (var p in this[w2K]) { if (S9y4F[v93](p, panel[s5i])) break; pos++; }
			var length = 0; for (var p in this[w2K]) length++; if (S9y4F[F8v](pos, length - 1)) return; var i = 0; for (var p in this[(k5Z + N6M + F2v)]) {
				if (S9y4F[L5Z](p, panel[(j1M + K1y)])) { i++; continue; }
				newPanels[p] = this[w2K][p]; if (S9y4F[Z4M](i, pos + 1)) newPanels[panel[s5i]] = panel; i++;
			}
			this[w2K] = newPanels; this[X9y](); this[c2y](); this[e9Z]();
		}
		; STXChart.prototype.panelSolo = function (panel) {
			var t3B = "sa", J5i = "P6a", U5i = "A6a", G6y = "oldPercent", l5M = "stx_solo_lit", v4v = "F6"; this[s0M] = L9i; STXChart[(u4y + S9y4F.b3y + I4y + k7Z + S9y4F.W0Z + a6Z + A4Z + S9y4F.N9y + F9v)] = j8Z; this[m0i](); var hideOrNot = L9i; if (S9y4F[(v4v + I4y)](panel[e4i], L9i)) { hideOrNot = j8Z; panel[e4i] = j8Z; STX[e58](panel[p3y], l5M); panel[a7K] = panel[G6y]; this[w2K][n48][a7K] = this[w2K][n48][G6y]; }
			else {
				panel[e4i] = L9i; STX[e18](panel[p3y], l5M); if (S9y4F[U5i](panel[s5i], n48)) { panel[G6y] = panel[a7K]; }
				else { panel[G6y] = panel[a7K]; this[w2K][n48][G6y] = this[w2K][n48][a7K]; panel[a7K] = S9y4F[J5i](S9y4F.K3B, this[w2K][n48][(h6K + F28 + U0K)]); }
			}
			for (var p in this[w2K]) { this[w2K][p][A9y] = hideOrNot; }
			this[w2K][n48][A9y] = j8Z; panel[A9y] = j8Z; this[X9y](); this[c2y](); this[(t3B + S9y4F.u7Z + K1y + Y1Z + C6Z + S9y4F.a5Z)]();
		}
		; STXChart.prototype.calculatePanelPercent = function (panel) { var S03 = "t6a", u83 = "h6a", h = S9y4F[u83](panel[C2Z], panel.top); panel[a7K] = S9y4F[S03](h, this[n48][a18]); }
		; STXChart.prototype.resizePanels = function () {
			var C8Z = "O6a", v33 = "p6a", z5Z = "x6a", d2M = "calculatePanelPercent", F5v = "f6a", D88 = "irY", u2M = "y6a", z53 = "r6a", A2M = "ingPa", x4M = "esi", D6K = "B6a"; if (S9y4F[D6K](STXChart[(S9y4F.b3y + x4M + E8Z + A2M + C6Z)], S9y4F.o6i)) return; var up = L9i; if (S9y4F[z53](STXChart[P93], this[g3K](STXChart.resizingPanel.top))) up = j8Z; if (up) {
				var priorPanel = S9y4F.o6i; for (var p in this[w2K]) { if (S9y4F[u2M](this[(W0i + K1y + J6Z + S9y4F.a5Z)][p], STXChart[n8Z])) break; if (this[w2K][p][A9y]) continue; priorPanel = this[w2K][p]; }
				var newY = this[u2y](STXChart[(j1y + S9y4F.b3y + B6Z + r4y + w9M + D88)]); if (S9y4F[F5v](newY, priorPanel.top + o4Z)) { newY = priorPanel.top + o4Z; STXChart[P93] = this[g3K](newY); }
				priorPanel[C2Z] = newY; STXChart.resizingPanel.top = newY; this[d2M](priorPanel); this[d2M](STXChart[n8Z]);
			}
			else {
				var priorPanel = S9y4F.o6i; for (var p in this[w2K]) { if (S9y4F[z5Z](this[w2K][p], STXChart[n8Z])) break; if (this[w2K][p][A9y]) continue; priorPanel = this[w2K][p]; }
				var newY = this[u2y](STXChart[P93]); if (S9y4F[v33](newY, STXChart[n8Z][C2Z] - o4Z)) { newY = S9y4F[C8Z](STXChart[n8Z][(Q4y + B6Z + S9y4F.t3y + S9y4F.t3y + E73)], o4Z); STXChart[P93] = this[g3K](newY); }
				priorPanel[C2Z] = newY; STXChart.resizingPanel.top = newY; this[d2M](priorPanel); this[d2M](STXChart[n8Z]);
			}
			this[X9y](); this[c2y](); this[e9Z]();
		}
		; STXChart.prototype.adjustPanelPositions = function () {
			var c8y = "elCa", s4Z = 22, N58 = "W9a", E2y = "I9a", b8M = "w9a", x9y = "U9a", V0M = "m9a", b9M = "Q9a", T4Z = "N9a", J7M = "Z9a", R7y = "a9a", e1Z = "n9a", s6i = "ico", F53 = "C9a", l1y = "L9a", K68 = .05, g0i = "rcent", V9v = "c9a", n5M = "g6a"; if (S9y4F[n5M](this[n48][e5K], Z3y)) return; if (this[G5Z](X9y, arguments)) return; var lastBottom = S9y4F.Y3B, h = this[n48][a18], pixels = S9y4F.Y3B, first = j8Z, acc = S9y4F.Y3B, n = S9y4F.Y3B, activeSolo = j8Z; for (var x in this[w2K]) { var panel = this[(k5Z + w7B + K1y + F2v)][x]; if (isNaN(panel[a7K]) || S9y4F[V9v](panel[(k5Z + K1y + g0i)], S9y4F.Y3B)) panel[a7K] = K68; if (panel[(S9y4F.n0Z + D58 + u4y + K1y + a6Z)]) continue; acc += panel[a7K]; n++; if (panel[e4i]) activeSolo = L9i; }
			for (var x in this[w2K]) {
				var panel = this[w2K][x]; if (panel[A9y]) {
					if (panel[j7K]) panel[j7K][q68][G5v] = H8M; if (panel[o9v]) { panel[o9v][q68][G5v] = H8M; }
					continue;
				}
				if (!first) { first = L9i; panel[s1v][(j1y + S9y4F.n0Z + S9y4F.W0Z + i3y + S9i + a6Z)][S9y4F.K3B][(S9y4F.a5Z + m2i + K1y)][G5v] = H8M; }
				else { panel[s1v][o8K][S9y4F.K3B][q68][G5v] = Z3y; }
				if (activeSolo) {
					if (panel[e4i]) { panel[s1v][o8K][S9y4F.V3B][q68][G5v] = Z3y; }
					else { panel[(S9y4F.W0Z + j3v + S9y4F.a5Z)][o8K][S9y4F.V3B][q68][G5v] = H8M; }
				}
				else if (S9y4F[l1y](n, S9y4F.K3B) || S9y4F[F53](n, S9y4F.V3B)) { panel[(s6i + G0K)][o8K][S9y4F.V3B][q68][G5v] = (a6Z + h73 + K1y); }
				else { panel[s1v][o8K][S9y4F.V3B][q68][(G7M + S9y4F.a5Z + k5Z + J6Z + I4y + q7Z)] = Z3y; }
				if (S9y4F[e1Z](n, S9y4F.K3B)) { panel[s1v][o8K][S9y4F.o7B][q68][G5v] = H8M; }
				else { panel[s1v][o8K][S9y4F.o7B][q68][G5v] = Z3y; }
				panel[(k5Z + K1y + S9y4F.b3y + F28 + a6Z + S9y4F.t3y)] = S9y4F[R7y](panel[a7K], acc); panel.top = lastBottom; panel[C2Z] = panel.top + (S9y4F[J7M](h, panel[a7K])); panel.height = S9y4F[T4Z](panel[C2Z], panel.top); var yAxis = panel[n5K]; yAxis.top = panel.top + yAxis[W88]; yAxis[C2Z] = S9y4F[b9M](panel[C2Z], yAxis[v9Z]); yAxis.height = S9y4F[V0M](yAxis[C2Z], yAxis.top); lastBottom = panel[C2Z]; if (!yAxis[V58] && S9y4F[x9y](yAxis[V58], S9y4F.Y3B)) { yAxis[(S9y4F.n0Z + S9y4F.W0Z + A4Z + S9y4F.n0Z)] = z8M; yAxis[W58] = S9y4F.Y3B; yAxis[O3B] = z8M; }
				yAxis[S4y] = S9y4F[b8M](yAxis.height, yAxis[O3B]); if (panel[o9v]) { panel[o9v][q68][G5v] = z98; panel[o9v][(S9y4F.a5Z + U2Z + r3y)].width = this[n48].width + (k5Z + P7Z); panel.markerHolder.style.top = panel.top + V1M; panel[o9v][q68].height = panel.height + "px"; }
			}
			if (x) this[w2K][x][s1v][o8K][S9y4F.o7B][q68][G5v] = H8M; if (S9y4F[E2y](n, S9y4F.V3B) && !activeSolo) { this[w2K][n48][s1v][o8K][S9y4F.V3B][q68][G5v] = Z3y; }
			if (this[E0y][p8Z] && this[w2K][n48]) this[E0y][p8Z][q68][C2Z] = (S9y4F[N58](this[n48][a18], this[w2K][(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y)][C2Z], s4Z)) + V1M; this[(f18 + K1y + I4y + S9y4F.b3y + F6y + M1i + c8y + j1y + S9y4F.n0Z + K1y)](); this[z33](); this[P9i](X9y, arguments);
		}
		; STXChart.prototype.addChart = function (name, chart) { chart[s5i] = name; this[(r63 + K2i + S9y4F.a5Z)][name] = chart; }
		; STXChart.prototype.createPanel = function (display, name, height, chartName) {
			var U6y = "av", r68 = "ckP", C1K = "O9", E1y = "p9a", K7v = "x9a", U5y = "Heigh", J3Z = "runPre"; if (this[(J3Z + V5M + a6Z + u4y)]("createPanel", arguments)) return; if (!chartName) chartName = "chart"; var h = this[n48][(Z98 + N03 + U5y + S9y4F.t3y)]; if (!height) { height = S9y4F[K7v](h, .20); }
			var percent = S9y4F[E1y](height, h), reduce = S9y4F[(C1K + I4y)](1, percent); for (var p in this[w2K]) { var panel = this[w2K][p]; panel[a7K] *= reduce; }
			this[(S9y4F.a5Z + P7y + r68 + I4y + P8K + J6Z)](display, name, percent, chartName); this[X9y](); this[(S9y4F.a5Z + U6y + K1y + F6y + N6M + F2v)](false); this[P9i]("createPanel", arguments);
		}
		; STXChart.prototype.stackPanel = function (display, name, percent, chartName) {
			var e8v = "L0a", U3K = "grabHandle", Y5K = "nm", z13 = "hideCrosshairs", D2i = "sS", Y5y = "evic", u9Z = "isSu", A83 = "chart-title", T98 = "Solo", p7y = "down", U2K = "hild", h93 = "yle", Z6M = "Temp", m7Z = "clo", H4K = "closeXTemplate", Y98 = "handleTemplate", M5i = "cloneNode", u8Z = "iconsTemplate", w6y = "g9a"; if (this[G5Z](x5K, arguments)) return; if (!chartName) chartName = n48; var chart = this[M18][chartName], isChart = (S9y4F[w6y](name, chartName)); if (isChart) { display = chart[e5K]; if (chart[t2Z]) display = chart[t2Z]; }
			var panel = this[w2K][name] = new STXChart[h5y](name); panel[a7K] = percent; panel[n48] = chart; panel[G5v] = display; panel[s1v] = this[E0y][u8Z][M5i](L9i); panel[f0v] = this[E0y][Y98][M5i](L9i); if ($$(H4K)) { panel[j7K] = $$((m7Z + k5y + e7y + Z6M + J6Z + H2y))[M5i](L9i); panel[j7K][(S9y4F.a5Z + S9y4F.t3y + h93)][G5v] = X1v; panel[j7K][D58] = S9y4F.o6i; panel[F9Z] = panel[j7K][(j1y + U2K + d4M)][S9y4F.Y3B]; }
			else { panel[j7K] = S9y4F.o6i; panel[F9Z] = panel[s1v][o8K][S9y4F.a3B]; }
			panel[f0v][D58] = S9y4F.o6i; panel[s1v][q68][G5v] = X1v; panel[Y1y] = panel[s1v][o8K][S9y4F.Y3B]; panel[W9v] = panel[s1v][o8K][S9y4F.K3B]; panel[p3y] = panel[s1v][o8K][S9y4F.V3B]; panel[p7y] = panel[s1v][o8K][S9y4F.o7B]; if (!this[Z0i]) panel[W9v][q68][G5v] = H8M; if (!this[Z0i]) panel[p7y][q68][G5v] = H8M; if (!this[(G7M + a8K + D0y + X6y + R48 + G0K + T98)]) panel[p3y][q68][G5v] = H8M; if (!this[F6i]) { if (panel[j7K]) panel[j7K][q68][G5v] = H8M; else panel[F9Z][q68][G5v] = (a6Z + B6Z + a6Z + K1y); }
			if (!this[Z4v]) panel[f0v][q68][G5v] = H8M; panel[Y1y][x1M] = display; if (isChart) STX[e18](panel[Y1y], A83); if (!STX[I5M] || STX[Z2M]) panel[s1v][d73] = (function (self) {
				return function (e) { var S4i = "Crossh", p4i = "hid"; self[(p4i + K1y + S4i + Y7y + X2i)](); }
				;
			}
			)(this); if (!STX[I5M] || STX[(u9Z + S9y4F.b3y + q4Z + I4y + j1y + K1y)]) panel[s1v][c53] = (function (self) {
				return function (e) { self[m0i](); }
				;
			}
			)(this); if (panel[j7K]) {
				if (!STX[(S9y4F.t3y + B6Z + B3y + r28 + g9y + Y5y + K1y)] || STX[(S9y4F.W0Z + D2i + B3y + S9y4F.b3y + q4Z + I4y + j1y + K1y)]) panel[j7K][d73] = (function (self) {
					return function () { self[z13](); }
					;
				}
				)(this); if (!STX[I5M] || STX[Z2M]) panel[j7K][(B6Z + Y5K + B6Z + B3y + k5y + B6Z + B3y + S9y4F.t3y)] = (function (self) {
					return function () { self[m0i](); }
					;
				}
				)(this);
			}
			panel[f0v][v73] = panel; if (!STX[I5M] || STX[Z2M]) panel[f0v][d73] = (function (self) {
				return function () { self[z13](); }
				;
			}
			)(this); if (!STX[I5M] || STX[Z2M]) panel[f0v][c53] = (function (self) {
				return function () { self[m0i](); }
				;
			}
			)(this); if (STX[I5M]) {
				panel[f0v][l0i] = (function (stx, panel) {
					return function (e) { var x6v = "c0a"; if (S9y4F[x6v](stx[n8Z], S9y4F.o6i)) return; stx[U3K](e, panel); }
					;
				}
				)(this, panel); panel[f0v][W73] = (function (stx) {
					return function (e) { var f7y = "releaseHandle"; stx[f7y](e); }
					;
				}
				)(this);
			}
			panel[f0v][U4M] = (function (stx, panel) {
				return function (e) { if (!e) e = event; stx[U3K](e, panel); }
				;
			}
			)(this, panel); panel[f0v][v0i] = (function (stx) {
				return function (e) { var S9M = "eas", f9M = "rel"; if (!e) e = event; stx[(f9M + S9M + K1y + V4y + w7B + i4M + K1y)](e); }
				;
			}
			)(this); panel[F9Z][B2Z] = (function (stx, panel) {
				return function () { stx[C4Z](panel); }
				;
			}
			)(this, panel); panel[W9v][B2Z] = (function (stx, panel) {
				return function () { var M6M = "panelUp"; stx[M6M](panel); }
				;
			}
			)(this, panel); panel[p7y][B2Z] = (function (stx, panel) {
				return function () { var m48 = "panelDown"; stx[m48](panel); }
				;
			}
			)(this, panel); panel[p3y][B2Z] = (function (stx, panel) {
				return function () { stx[H23](panel); }
				;
			}
			)(this, panel); if (S9y4F[e8v](panel[s5i], n48)) panel[F9Z][q68][G5v] = H8M; if (this[P9i](x5K, arguments)) return;
		}
		; STXChart.prototype.drawPanels = function () {
			var I4M = "nApp", O7Z = "B0a", r1M = "stx_panel_border", W43 = "So", y3M = "UpDo", L83 = "hidd", p98 = "t0a", p8v = "h0a", A9M = "P0a", z1M = "0a", H1i = "n0a", k73 = "C0a", s68 = "Chil", Q98 = "ain", J5Z = "ded", g6y = "drawPanels"; if (this[G5Z]((g6y), arguments)) return; var first = j8Z; for (var p in this[w2K]) {
				var panel = this[w2K][p]; if (!panel[(i5i + K1y + a6Z + J5Z)]) { this[n48][(j1y + B6Z + a6Z + S9y4F.t3y + Q98 + K1y + S9y4F.b3y)][B73](panel[s1v]); this[n48][t28][B73](panel[f0v]); if (panel[j7K]) this[n48][t28][(I4y + k5Z + k5Z + K1y + a6Z + u4y + s68 + u4y)](panel[j7K]); panel[(I4y + k5Z + k5Z + i9Z + K1y + u4y)] = L9i; }
				if (S9y4F[k73](panel[Y1y][x1M], panel[G5v])) panel[Y1y][x1M] = panel[G5v]; panel[s1v][(j33 + J6Z + K1y)][G5v] = X1v; panel.icons.style.top = (S9y4F[H1i](this[g3K](panel.top), this.chart.top)) + V1M; if (panel[j7K]) { panel[j7K][q68][G5v] = X1v; panel.closeX.style.top = (S9y4F[(I4y + z1M)](panel[C2Z], panel[j7K][M03], S9y4F.o7B)) + V1M; }
				if (S9y4F[(S9y4F.E2K + z1M)](panel[A9y], L9i)) { if (S9y4F[A9M](panel[A9y], L9i)) panel[s1v][(S9y4F.a5Z + U2Z + J6Z + K1y)][G5v] = H8M; if (S9y4F[p8v](panel[A9y], L9i)) panel[f0v][q68][(G7M + x0y)] = H8M; if (S9y4F[p98](panel[(L83 + K1y + a6Z)], L9i) && panel[j7K]) panel[(j7K)][q68][(u4y + S9y4F.W0Z + x0y)] = H8M; continue; }
				else { if (!this[Z0i]) panel[W9v][q68][G5v] = H8M; if (!this[(u4y + S9y4F.W0Z + a8K + D0y + X6y + R48 + G0K + y3M + k7Z + a6Z)]) panel[(u4y + B6Z + k7Z + a6Z)][q68][G5v] = H8M; if (!this[(u4y + V2i + U8M + D0y + X6y + j1y + B6Z + G0K + W43 + J6Z + B6Z)]) panel[p3y][q68][G5v] = H8M; if (!this[F6i] && panel[j7K]) panel[j7K][q68][(V5K + D0y)] = H8M; }
				if (!first) { panel[f0v][q68][G5v] = H8M; first = L9i; continue; }
				var y = panel.top; y = Math[E08](y) + N0Z; this[h0i](S9y4F.Y3B, S9y4F.K3B, y, y, this[j2M](r1M), K5K, this[n48][U83], j8Z, {}
				); if (!this[Z4v]) { panel[f0v][q68][G5v] = H8M; }
				else { panel[f0v][q68][G5v] = Z3y; }
				panel.handle.style.top = (S9y4F[O7Z](y, panel[f0v][M6K] / S9y4F.V3B)) + V1M;
			}
			if (this[(S9y4F.b3y + B3y + I4M + K1y + a6Z + u4y)](g6y, arguments)) return;
		}
		; STXChart.prototype.touchSingleClick = function (finger, x, y) {
			var self = this, args = arguments; return function () {
				(function () {
					var e9K = "nAppe", b3M = "anel", B0Z = "g0a", g6Z = "Tic", r98 = "ssh", I8i = "ighl", a98 = "fin", V63 = "gC", k03 = "O0a", k0M = "ntP", j48 = "ackO", L2y = "x0a", g7B = "f0a", T5y = "y0a", m2K = "r0a"; if (!this[s0M]) {
						if (this[G5Z](i6v, args)) return; if (this[G2y]) return; this[M1M] = { s1MS: -S9y4F.K3B, e1MS: -S9y4F.K3B, s2MS: -S9y4F.K3B, e2MS: -S9y4F.K3B }
						; if (!this[R6y]) return; if (!this[a9i]) return; if (S9y4F[m2K](this[Y4M], Z3y)) return; if (S9y4F[T5y](x, this[n48][K1Z]) || S9y4F[g7B](x, this[n48][L0Z]) || S9y4F[L2y](y, this.chart.top) || S9y4F[(F4K + I4y)](y, this[n48][C2Z])) return; var cy = this[u2y](STXChart[P93]), cx = this[(Q4y + j48 + v2y)](STXChart[Y93]); this[(j1y + B3y + S9y4F.b3y + S9i + k0M + w7B + K1y + J6Z)] = this[s33](cy); if (S9y4F[k03](STXChart[m7M], Z3y) || !STX[N7Z][STXChart[m7M]] || !(new STX[N7Z][STXChart[m7M]])[M68]) {
							if (!this[(f1M + k7Z + G7i + V63 + J6Z + j98 + d9Z)](this[W1y], cx, cy)) {
								if (!this[v3Z][n2v]) {
									STXChart[P93] = S9y4F.Y3B; STXChart[Y93] = S9y4F.Y3B; this[(a98 + u4y + V4y + I8i + z5K + v4Z)](); STXChart[P93] = y; STXChart[Y93] = x; if (this[W1y] && this[W1y][n48][B6K]) { this[(j1y + S9y4F.b3y + B6Z + r98 + I4y + S9y4F.W0Z + S9y4F.b3y + g6Z + d9Z)] = S9y4F[B0Z](this[U3y](this[a8y](STXChart[Y93]), this[W1y][n48]), this[v3Z][y2Z]); this[B13] = this[p5y](this[W1y], this[o43], this[X5M](this[u2y](STXChart[P93]), this[(j1y + B3y + S9y4F.b3y + S9y4F.b3y + H43 + S9y4F.t3y + F6y + b3M)])); }
									this[C4y](); this[c98](L9i);
								}
							}
						}
					}
					self[s0M] = j8Z; if (this[(S9y4F.b3y + B3y + e9K + a6Z + u4y)](i6v, args)) return;
				}
				)[q38](self, args);
			}
			;
		}
		; STXChart.prototype.touchDoubleClick = function (finger, x, y) {
			var P0v = "Z4a", O5i = "a4a", N4i = "bl", U6i = "uchD", U93 = "n4a", r7Z = "C4a", K88 = "L4a", p28 = "c4a"; if (S9y4F[p28](x, this[n48][K1Z]) || S9y4F[K88](x, this[n48][L0Z]) || S9y4F[r7Z](y, this.panels[n48].top) || S9y4F[U93](y, this[w2K][n48][C2Z])) return; if (this[G2y]) return; if (this[G5Z]((S9y4F.t3y + B6Z + U6i + M23 + N4i + T8M + s5Z + j1y + d9Z), arguments)) return; if (STXChart[G53]) { this[q5K](); }
			else {
				if (this[c3v]) { this[o7v](); }
				else {
					var yAxis = this[W1y][n5K]; if (S9y4F[O5i](yAxis[i2v], (yAxis[B9v] - yAxis[m4v]) / S9y4F.V3B) && S9y4F[P0v](yAxis[f08], yAxis[B9v] + yAxis[m4v])) { this[z2v](); }
					else { this[g9K](this[W1y][n5K]); }
					this[c2y]();
				}
			}
			this[M1M] = { s1MS: -S9y4F.K3B, e1MS: -S9y4F.K3B, s2MS: -S9y4F.K3B, e2MS: -S9y4F.K3B }
			; if (this[P9i](q73, arguments)) return;
		}
		; STXChart.prototype.touchmove = function (e) {
			var O93 = "chm", q3Z = "Q8a", k0y = "N8a", C78 = "Z8a", R4Z = "allowThreeFingerTouch", T9y = "n8a", k7M = "C8a", L2Z = "L8a", O9v = "c8a", L6K = "g2a", U6v = "O2a", v88 = "p2a", Z78 = "x2a", w1i = "f2a", a8Z = "y2a", j2Z = "r2a", R38 = "B2a", C0y = "t2a", F38 = "rl", d8y = "h2a", K13 = "asin", k3v = "vein", R1v = "P2a", m6y = "A2a", z1y = "F2a", w1Z = "i2a", t33 = "j2a", c6y = "K2a", d4i = "V2a", a73 = "R1a", K4M = "l1a", e73 = "b1a", X33 = "E1a", h53 = "che", W5K = "lCa", I3B = "s1a", T8v = "gestureStartDistance", q8i = "J1a", M6i = "T1a", f8y = "D1a", g4v = "M1a", J53 = "X1a", b2M = "hM", t7B = "z1a", h9K = "S1a", K4v = "G1a", J2M = "H1a", I5y = "Y1a", a93 = "q1a", C2y = "o4a", p9Z = "u4a", G8y = "v4a", R98 = "e4", Q9K = "d4a", p0y = "W4a", s6K = "I4a", l2K = "gestur", g8i = "MSGESTURE_FLAG_INERTIA", o6v = "w4a", r3K = "ture", t2M = "eG", t8Z = "errid", U48 = "e2", R5K = "m4a", C9y = "reTouc", t4M = "igno", d7Z = "Q4a", j03 = "N4a"; if (S9y4F[j03](this[Y4M], "")) return; if (S9y4F[d7Z](STXChart[(t4M + C9y + S9y4F.n0Z)], true)) return; var localTouches = []; if (e && e[b63]) e[b63](); var now = new Date()[u68](); if (this[M1M][q8y] == -1) {
				this[M1M][d38] = now; if (S9y4F[R5K](this[M1M][d38] - this[M1M][a7y], 25)) { return; }
			}
			else {
				this[M1M][(U48 + G5y + U3B)] = now; if (S9y4F[(t7y + Z7K + I4y)](this[M1M][G68] - this[M1M][q8y], 25)) { return; }
			}
			if (STX[Z2M]) {
				if (this[c0Z]) return; if (!e[B88]) e[B88] = this[Z6K]; if ((!this[(O1K + Q4y + F1i + a6Z + i13 + u98 + K1y + H43)] || STXChart[n8Z]) && !this[(K23 + t8Z + t2M + B23 + r3K)]) {
					if (S9y4F[o6v](e[c7v], e[g8i])) { this[(l2K + K1y)][(S9y4F.a5Z + D3M)](); return; }
				}
				for (var i = 0; S9y4F[s6K](i, this[n93].length) ; i++) {
					if (S9y4F[p0y](this[n93][i][B88], e[B88])) {
						var xd = Math[F0Z](S9y4F[Q9K](this[n93][i][X3y], e[T88])), yd = Math[F0Z](S9y4F[(R98 + I4y)](this[n93][i][j5Z], e[O3M])), c = Math[i43](S9y4F[G8y](xd, xd) + S9y4F[p9Z](yd, yd)); if (!c) return; this[M1M][d38] = new Date()[u68](); if (S9y4F[C2y](this[M1M][d38] - this[M1M][a7y], 50)) { return; }
						if (S9y4F[a93](this[n93][i][X3y], e[T88]) && S9y4F[I5y](this[(J5K + S9y4F.n0Z + K1y + S9y4F.a5Z)][i][j5Z], e[O3M])) return; this[n93][i][X3y] = e[T88]; this[n93][i][j5Z] = e[O3M]; break;
					}
				}
				if (S9y4F[J2M](i, 0)) { this[F58] = true; }
				else { this[r83] = true; }
				if (!this[J13] && S9y4F[K4v](i, this[n93].length)) { return; }
				this[(r28 + w7B + o53 + u4y + l3B + M23 + r28 + K1y + S9y4F.a5Z)] = [{ pointerId: e[B88], pageX: e[T88], pageY: e[O3M] }
				]; localTouches = this[n93]; if (this[J13] && S9y4F[h9K](localTouches.length, 0)) { localTouches = this[I7B]; }
			}
			else { localTouches = e[n93]; this[I7B] = e[I7B]; }
			var crosshairXOffset = this[f6i], crosshairYOffset = this[T0y]; if (this[g23] && this[g23][M68]) { crosshairXOffset = 0; crosshairYOffset = 0; }
			if (this[G5Z]("touchmove", arguments)) return; if (S9y4F[t7B](STXChart[n8Z], null)) { var touch = localTouches[0], x = touch[X3y], y = touch[j5Z]; this[l8v](x + crosshairXOffset, y + crosshairYOffset); return; }
			if (this[w8M] != -1) { this[(J5K + b2M + B6Z + S9y4F.u7Z + K1y + h8M + v5v)] = new Date(); }
			this[Q2M] = this[w8M]; this[w8M] = localTouches[0][X3y]; if (S9y4F[J53](localTouches.length, 1)) {
				if (!this[i9M]) { var touch = localTouches[0], x = touch[X3y], y = touch[j5Z]; this[l8v](x + crosshairXOffset, y + crosshairYOffset); }
			}
			else if (S9y4F[g4v](localTouches.length, 2)) {
				if (!this[R6y]) return; var touch1 = localTouches[0], x1 = touch1[X3y], y1 = touch1[j5Z], touch2 = localTouches[1], x2 = touch2[X3y], y2 = touch2[j5Z], distance = Math[i43](S9y4F[f8y]((x2 - x1), (x2 - x1)) + S9y4F[M6i]((y2 - y1), (y2 - y1))); this[j3M] = Math[d5y](x1, x2) + S9y4F[(d9Z + u6K + I4y)]((Math[L8y](x1, x2) - Math[d5y](x1, x2)), 2); var delta = Math[E08](S9y4F[q8i](this[T8v], distance)), noCrosshairs = (!this[v3Z][n2v] && S9y4F[I3B](STXChart[m7M], "")); if (noCrosshairs) this[(j6M + O8K + S9y4F.n0Z + S9y4F.W0Z + a6Z + z18 + S9i + H43)] = 5; this[(I9v + S9y4F.b3y + F6y + S9y4F.W0Z + e5M + W5K + h53)](); if (S9y4F[X33](this[i9M], 2)) {
					if (STX[Z2M] && (!this[F58] || !this[r83])) { return; }
					if ((S9y4F[e73](x1, this[M0M][s0K]) && S9y4F[K4M](x2, this[M0M][k4K])) || (S9y4F[a73](x1, this[M0M][s0K]) && S9y4F[d4i](x2, this[M0M][k4K])) || (S9y4F[c6y](y1, this[M0M][P8M]) && S9y4F[t33](y2, this[M0M][C1M])) || (S9y4F[w1Z](y1, this[M0M][P8M]) && S9y4F[z1y](y2, this[M0M][C1M]))) { this[i9M] = 0; }
					else { this[i9M]++; if (S9y4F[m6y](this[i9M], 2)) return; }
				}
				this[M0M] = { x1: x1, x2: x2, y1: y1, y2: y2 }
				; if (S9y4F[R1v](this[i9M], 0)) { this[(Y9Z + B6Z + f6v + K1y + Y9Z + B6Z + k3v + P8K + S9y4F.b3y)](x1 + crosshairXOffset, y1 + crosshairYOffset); this[T8v] = distance; }
				else {
					var angle = Math[K13](S9y4F[d8y]((Math[L8y](y2, y1) - Math[d5y](y2, y1)), distance)); this[(j1y + S9y4F.t3y + F38)] = true; if (S9y4F[C0y](Math[F0Z](delta), 12) && !noCrosshairs) {
						this[p6y]++; if (S9y4F[R38](this[p6y], 4)) { this[i9M] = 0; this[p6y] = 0; this[z6v] = false; return; }
					}
					else { this[p6y] = 0; }
					if (S9y4F[(j2Z)](angle, 1) || (!this[U0v] && S9y4F[a8Z](angle, 1.37))) { if (!this[W1y]) return; var chart = this[W1y][n48]; this[U0v] = false; var tickDistance = S9y4F[w1i](this[U7v][k4K], this[U7v][s0K]), pixelDistance = S9y4F[Z78](this[M0M][k4K], this[M0M][(P7Z + u6K)]), newCandleWidth = S9y4F[v88](pixelDistance, tickDistance); if (S9y4F[U6v](newCandleWidth, .25)) newCandleWidth = .25; this[r73](newCandleWidth, chart); var centerTick = this[U7v][(P7Z + u6K)] + Math[E08](S9y4F[L6K](tickDistance, 2)), centerX = this[M0M][s0K] + Math[E08](S9y4F[O9v](pixelDistance, 2)), currentTick = this[U3y](centerX, chart); chart[i2v] += Math[z0Z](S9y4F[L2Z]((currentTick - centerTick), this[v3Z][y2Z])); this[c2y](); }
					else { var yAxis = this[W1y][n48][v73][n5K]; this[U0v] = true; yAxis[f08] = this[U98] + (S9y4F[k7M](this[T8v], distance)); this[c2y](); }
					this[z6v] = false;
				}
			}
			else if (S9y4F[T9y](localTouches.length, 3) && STXChart[R4Z]) {
				if (!this[R6y]) return; var touch1 = localTouches[0], x1 = touch1[X3y], distance = S9y4F[(T6v + I4y)](this[V8y], x1); this[I2y] = this[i7M] + Math[E08](S9y4F[C78](distance, 10)); if (S9y4F[k0y](this[I2y], 1)) this[I2y] = 1; if (typeof headsUp != "undefined") { headsUp[(k5Z + I13 + S9y4F.W0Z + B6Z + u4y)][x1M] = this[I2y] + " " + this[v3Z][l2M]; if (S9y4F[q3Z](this[I2y], 1)) headsUp[N8Z][x1M] += "s"; }
			}
			if (this[P9i]((t0Z + B3y + O93 + B6Z + f8v), arguments)) return;
		}
		; STXChart.prototype.touchstart = function (e) {
			var c5v = "X7a", O0Z = "romPi", c08 = "grabStartPt", G6M = "tScr", h6v = "tar", A0M = "z7a", D1Z = "S7a", T0K = "tDist", g4M = "eS", z93 = "ches", E0i = "G7a", O6M = "Pixe", d7M = "alueF", E7Z = "urr", z8y = "Fro", D5i = "ick", T7v = "7a", e6M = "Ty", K7Z = "cto", i78 = "eCha", Y4v = "nsid", Z1y = "deCh", D48 = "Y7a", m23 = "q7", x23 = "o8a", m2M = "u8a", R83 = "v8a", L0y = "e8a", C68 = "mov", r6i = "d8a", k78 = "W8a", m1i = "I8a", K28 = "w8a", k3K = "doubleFingerMoves", j0Z = "U8a", w93 = "m8a"; if (S9y4F[w93](STXChart[y7y], true)) return; if (STX[Z2M]) { this[F58] = false; this[r83] = false; }
			else { if (this[m98]) clearTimeout(this[m98]); this[G63] = true; this[n93] = e[n93]; this[I7B] = e[I7B]; }
			if (S9y4F[j0Z](STXChart[n8Z], null)) return; var crosshairXOffset = this[f6i], crosshairYOffset = this[T0y]; if (this[G5Z]("touchstart", arguments)) return; this[k3K] = 0; this[t7v] = true; this[p6y] = 0; this[d8i] = false; if (S9y4F[K28](this[n93].length, 1) || S9y4F[m1i](this[n93].length, 2)) {
				if (S9y4F[k78](this[I7B].length, 1)) {
					var now = Date[o6Z](); this[M1M][P7Z] = this[I7B][0][X3y]; this[M1M][q7Z] = this[I7B][0][j5Z]; if (S9y4F[r6i](now - this[(j1y + s5Z + j1y + c1Z)][(K1y + u6K + G5y + U3B)], 250)) { this[s0M] = true; this[M1M][q8y] = now; }
					else { this[s0M] = false; this[M1M][a7y] = now; this[M1M][d38] = -1; this[M1M][q8y] = -1; this[M1M][G68] = -1; }
				}
				this[t8K] = Date[o6Z](); this[(C68 + T3M)] = this[n93][0][X3y]; this[w8M] = -1; var touch1 = this[n93][0], x1 = touch1[X3y], y1 = touch1[j5Z]; if (S9y4F[L0y](this[n93].length, 1)) { var cy = this[n58] = this[u2y](y1); this[W1y] = this[s33](cy); }
				if (!this[W1y]) this[W1y] = this[n48][v73]; if (S9y4F[R83](x1, this[n48][K1Z]) && S9y4F[m2M](x1, this[n48][L0Z]) && S9y4F[x23](y1, this.chart.top) && S9y4F[(m23 + I4y)](y1, this[n48][C2Z])) { STXChart[L13] = true; }
				else { STXChart[L13] = false; }
				if (!this[v3Z][n2v] && S9y4F[D48](STXChart[m7M], "") && STXChart[(G7i + S9y4F.a5Z + S9y4F.W0Z + Z1y + I4y + S9y4F.b3y + S9y4F.t3y)]) {
					for (var p in this[w2K]) {
						var panel = this[w2K][p]; if (panel[l83]) { STXChart[n8Z] = panel; return; }
					}
					this[Q93] = true; this[I98] = false; this[V8y] = x1 + crosshairXOffset; this[F8y] = y1 + crosshairYOffset; this[h1v] = this[W1y][n48][i2v]; this[K1v] = this[W1y][n5K][i2v]; setTimeout((function (self) {
						return function () { self[a4v](); }
						;
					}
					)(this), 100);
				}
				else {
					this[Q93] = false; if (STXChart[(S9y4F.W0Z + Y4v + i78 + S9y4F.b3y + S9y4F.t3y)]) {
						if (STX[N7Z][STXChart[m7M]] && (new STX[N7Z][STXChart[(S9y4F.u7Z + K1y + K7Z + S9y4F.b3y + e6M + k5Z + K1y)]])[M68]) {
							this[K4Z] = true; STXChart[Y93] = x1; STXChart[P93] = y1; if (this[W1y] && this[W1y][n48][B6K]) { this[o43] = S9y4F[(V4y + T7v)](this[(S9y4F.t3y + D5i + z8y + m4K + b73)](this[a8y](STXChart[Y93]), this[W1y][n48]), this[(C7Z + q7Z + B6Z + r2v)][y2Z]); this[B13] = this[p5y](this[(j1y + E7Z + K1y + U0K + F6y + I4y + P8K + J6Z)], this[o43], this[(S9y4F.u7Z + d7M + S9y4F.b3y + B6Z + Y9Z + O6M + J6Z)](this[u2y](STXChart[P93]), this[W1y])); }
							this[o13](this[W1y], this[a8y](x1), this[u2y](y1)); this[C4y](); return;
						}
					}
				}
			}
			if (S9y4F[E0i](this[(S9y4F.t3y + B6Z + B3y + z93)].length, 2)) {
				if (!this[R6y] || !STXChart[L13]) return; var touch2 = this[(S9y4F.t3y + B6Z + B3y + z93)][1], x2 = touch2[X3y], y2 = touch2[j5Z]; for (var p in this[w2K]) {
					var panel = this[w2K][p]; if (panel[l83]) { STXChart[n8Z] = panel; return; }
				}
				var chart = this[W1y][n48]; this[(A4Z + D6M + a9v + g4M + S9y4F.t3y + I4y + S9y4F.b3y + T0K + I4y + O8K + K1y)] = Math[i43](S9y4F[D1Z]((x2 - x1), (x2 - x1)) + S9y4F[A0M]((y2 - y1), (y2 - y1))); this[M0M] = { x1: x1, x2: x2, y1: y1, y2: y2 }
				; this[Q93] = true; this[V8y] = x1 + crosshairXOffset; this[F8y] = y1 + crosshairYOffset; this[(A4Z + S9y4F.b3y + K4y + h6v + G6M + B6Z + v6Z + e7y)] = this[W1y][(n48)][i2v]; this[K1v] = this[W1y][n5K][i2v]; this[v43] = this[v3Z][C9i]; this[U98] = this[W1y][n5K][f08]; this[c08] = this[M0M]; this[U7v] = { x1: this[(S9y4F.t3y + j98 + S6i + O0Z + P7Z + b73)](this[(M0M)][s0K], chart), x2: this[U3y](this[M0M][k4K], chart), y1: this[X5M](this[M0M][P8M], this[W1y]), y2: this[X5M](this[M0M][C1M], this[W1y]) }
				; this[d8i] = true; setTimeout((function (self) {
					return function () { var h8K = "bin"; self[(A4Z + A0i + Q4y + h8K + A4Z + V4y + W6M)](); }
					;
				}
				)(this), 100);
			}
			else if (S9y4F[c5v](this[n93].length, 3)) { if (!this[R6y]) return; var touch1 = this[(S9y4F.t3y + M23 + j1y + S9y4F.n0Z + K1y + S9y4F.a5Z)][0], x1 = touch1[X3y]; this[V8y] = x1; this[i7M] = this[v3Z][y2Z]; }
			if (this[P9i]("touchstart", arguments)) return;
		}
		; STXChart.prototype.touchend = function (e) {
			var v5Z = "nAp", B8v = "y3a", u1y = "rabEndP", N5Z = "ayNMi", a5K = "owI", S2i = "city", I5K = "odi", c18 = "dP", w7v = "bEn", N8y = "r3a", n03 = "B3a", s0Z = "t3a", b1i = "h3a", I4Z = "P3a", l6Z = "A3a", s2Z = "F3a", X8K = "oF", g1Z = "tw", U2y = "i3a", Y28 = "j3a", T3y = "K3a", Q4i = "V3a", g3y = "R7a", h7v = "icks", l0y = "l7a", l23 = "ee", c3y = "abb", w18 = "ePa", M2y = "E7a", T7K = "s7a", A5Z = "J7a", J1M = "k7a", S5Z = "T7a", n7K = "D7a", M43 = "M7a"; if (S9y4F[M43](STXChart[y7y], true)) return; if (STX[Z2M]) { }
			else { this[n93] = e[n93]; this[I7B] = e[I7B]; }
			if (this[G5Z]("touchend", arguments)) return; if (S9y4F[n7K](this[n93].length, 1) || S9y4F[S5Z](this[n93].length, 0)) {
				if (this[(J6Z + I4y + q7Z + B6Z + B3y + S9y4F.t3y)][n2v] || S9y4F[J1M](STXChart[m7M], "")) {
					if (S9y4F[A5Z](this[n93].length, 0) || !this[d8i]) { this[Q93] = false; }
				}
			}
			if (this[n93].length) { this[V8y] = -1; this[F8y] = -1; }
			if (S9y4F[T7K](this[n93].length, 0)) {
				this[m98] = setTimeout((function (self) {
					return function () { self[G63] = false; }
					;
				}
				)(this), 500); if (S9y4F[M2y](STXChart[n8Z], null)) { STX[x4y](this[n48][u28], this); this[(S9y4F.b3y + K1y + H9y + E8Z + w18 + a6Z + S68)](); STXChart[n8Z] = null; return; }
				this[i9M] = null; this[j3M] = null; this[U0v] = false; this[(A4Z + S9y4F.b3y + c3y + G7i + z18 + S9y4F.b3y + l23 + a6Z)] = false;
			}
			else { if (S9y4F[(Q4y + N8K + I4y)](STXChart[n8Z], null)) return; }
			if (S9y4F[l0y](this[I7B].length, 1)) {
				var now = Date[o6Z](), finger = this[n93].length + 1; if (this[M1M][q8y] == -1) {
					this[(f18 + h7v)][d38] = now; if (S9y4F[g3y](STXChart[m7M], "") || !STX[N7Z][STXChart[m7M]] || !(new STX[N7Z][STXChart[m7M]])[M68]) {
						if (S9y4F[Q4i](this[M1M][d38] - this[M1M][a7y], 250)) { setTimeout(this[i6v](finger, this[(j1y + s5Z + x9i)][P7Z], this[M1M][q7Z]), 200); }
						else {
							this[M1M] = { s1MS: -1, e1MS: -1, s2MS: -1, e2MS: -1 }
							;
						}
					}
					this[K4Z] = false; if (this[g23] && this[g23][M68]) { var cy = this[u2y](this[I7B][0][j5Z]), cx = this[a8y](this[I7B][0][X3y]); this[o13](this[W1y], cx, cy); return; }
				}
				else {
					this[M1M][G68] = now; if (S9y4F[T3y](this[M1M][G68] - this[M1M][q8y], 250)) { this[q73](finger, this[M1M][P7Z], this[M1M][q7Z]); }
					else {
						this[M1M] = { s1MS: -1, e1MS: -1, s2MS: -1, e2MS: -1 }
						;
					}
				}
				if ((!this[v3Z][n2v] && S9y4F[Y28](STXChart[m7M], "") && S9y4F[U2y](finger, 1)) || (this[(g1Z + X8K + S9y4F.W0Z + a6Z + A4Z + I13 + U3B + S9y4F.t3y + I4y + S9y4F.b3y + S9y4F.t3y)] && S9y4F[s2Z](this[(J5K + S9y4F.n0Z + B23)].length, 0))) {
					this[v2v] = S9y4F[l6Z](Date[o6Z](), this[t8K]); this[v2v] = Math[L8y](16, this[v2v]); if (S9y4F[I4Z](this[v2v], 300) && this[w8M] != -1 && this[Q2M] != -1) {
						this[d5v] = S9y4F[b1i](this[w8M], this[Q2M]); if (S9y4F[s0Z](this[d5v], this[v2v] * 5)) this[d5v] = S9y4F[n03](this[v2v], 5); else if (this[d5v] < this[v2v] * -5) this[d5v] = this[v2v] * -5; if (S9y4F[N8y](Math[F0Z](this[d5v]), 15)) { this[K1v] = 0; this[t7v] = false; this[(S9y4F.a5Z + K7M + V5M + G5y + B3v)](); }
					}
				}
				else { this[w8M] = -1; }
			}
			else {
				if (this[I2y] != -1 && !isNaN(this[(O1K + w7v + c18 + I13 + S9y4F.W0Z + I5K + S2i)])) {
					if (this[E5Z](this[v3Z][l2M]) || this[(R8K + a5K + U0K + A0i + u4y + N5Z + a6Z + B3y + f3y)]) { this[i0M](this[I2y]); }
					this[(A4Z + u1y + K1y + S9y4F.b3y + S9y4F.W0Z + B6Z + u4y + S9y4F.W0Z + S2i)] = -1;
				}
			}
			if (S9y4F[B8v](this[n93].length, 0)) { this[d8i] = false; }
			if (this[(u2i + v5Z + k5Z + K1y + w8K)]("touchend", arguments)) return;
		}
		; STXChart.prototype.startProxy = function (e) {
			var y9y = "tart", E1M = "chs", y98 = "tou", p5M = "addPointer", D5v = "overrideGesture", f8i = "p3a", k4i = "x3a", n23 = "f3a"; if (S9y4F[n23](e[n0y], 4) || S9y4F[k4i](e[n0y], "mouse")) { this[c0Z] = true; }
			else { this[c0Z] = false; }
			if (this[c0Z]) return; this[n93][this[n93].length] = { pointerId: e[B88], pageX: e[T88], pageY: e[O3M] }
			; this[I7B] = [{ pointerId: e[B88], pageX: e[T88], pageY: e[O3M] }
			]; if (!this[J13] && S9y4F[f8i](this[n93].length, 1)) { this[Z6K] = e[B88]; this[D5v] = false; if (!this[F7M]) return; this[(o53 + O4y + B3y + S9y4F.b3y + K1y)][p5M](e[B88]); this[K38](e); }
			else { this[F7M][Q0i](); this[(y98 + E1M + y9y)](e); }
		}
		; STXChart.prototype.moveProxy = function (e) {
			var M5v = "g3a"; if (S9y4F[(b5y + S9y4F.z6K + I4y)](e[n0y], S9y4F.a3B) || S9y4F[M5v](e[n0y], R2M)) { this[c0Z] = L9i; }
			else { this[c0Z] = j8Z; }
			if (this[c0Z]) return; if (!this[J13]) this[Z9y](e);
		}
		; STXChart.prototype.endProxy = function (e) {
			var W6y = "C5V", s9i = "L5V", A9Z = "c5V"; if (this[c0Z]) return; var hm = this[n93].length; for (var i = 0; S9y4F[A9Z](i, this[n93].length) ; i++) {
				if (S9y4F[s9i](this[(S9y4F.t3y + B6Z + B3y + j1y + A33 + S9y4F.a5Z)][i][B88], e[B88])) { this[n93][j7Z](i, 1); break; }
			}
			if (S9y4F[W6y](i, hm)) { this[n93] = []; this[Q93] = false; this[G63] = false; return; }
			this[I7B] = [{ pointerId: e[B88], pageX: e[T88], pageY: e[O3M] }
			]; if (!this[J13]) { this[V28](e); }
		}
		; STXChart.prototype.msMouseMoveProxy = function (e) { if (this[n93].length || !this[c0Z]) return; this[g2v](e); }
		; STXChart.prototype.msMouseDownProxy = function (e) { if (!this[(Y9Z + B6Z + f6v + K1y + U9v + e2M)]) return; this[C2v](e); }
		; STXChart.prototype.msMouseUpProxy = function (e) { if (!this[c0Z]) return; this[Y2M](e); }
		; STXChart.prototype.iosMouseMoveProxy = function (e) { if (this[G63]) return; this[g2v](e); }
		; STXChart.prototype.iosMouseDownProxy = function (e) {
			if (this[G63]) { this[c0Z] = j8Z; return; }
			this[c0Z] = L9i; this[C2v](e);
		}
		; STXChart.prototype.iosMouseUpProxy = function (e) { if (this[G63]) return; this[Y2M](e); }
		; STXChart.prototype.swipeMove = function () {
			var z78 = "Dis", F7K = "ome", D7Z = "W5V", l4K = "I5V", X8Z = "w5V", Y7v = "m5V", P9Z = "Q5V", G8M = "N5V", r6Z = "Z5V", l7y = "5V", c8K = "n5V"; if (this[t7v] || S9y4F[c8K](this[d5v], 0)) {
				this[d5v] = 0; this[Q93] = false; if (S9y4F[(I4y + l7y)](this[W1y][n48][i2v], this[W1y][n48][H58])) { this[c2y](); }
				return;
			}
			this[d5v] /= 2; this[Q93] = true; this[h1v] = this[W1y][n48][i2v]; this[V8y] = S9y4F[r6Z](this[(r28 + p6Z)].width, 2); this[F8y] = 200; var deceleration = 0.0006, speed = S9y4F[G8M](Math[F0Z](this[d5v]), this[v2v]), newDist = S9y4F[P9Z]((speed * speed), (2 * deceleration)), newTime = 0, outsideDist = 0; newDist = newDist * (S9y4F[Y7v](this[d5v], 0) ? -1 : 1); newTime = S9y4F[(t7y + b8K + H7y)](speed, deceleration); if (S9y4F[X8Z](this[d5v], 0)) {
				if (newDist > -4) { this[d5v] = 0; return; }
			}
			else {
				if (S9y4F[l4K](newDist, 4)) { this[d5v] = 0; return; }
			}
			this[d5v] = newDist; if (this[j9M]) { clearTimeout(this[j9M]); }
			this[U13](this[d5v], S9y4F[D7Z](this[(Y9Z + F7K + U0K + B3y + Y9Z + z78 + P7y + T53)], 300, 12), this[d5v]);
		}
		; STXChart.prototype.scrollTo = function (x, inc, original) {
			var p9K = "C6V", N93 = "L6", q43 = "g5V", J9y = "O5V", R93 = "p5V", t6M = "x5V"; if (this[t7v] || S9y4F[t6M](Math[F0Z](inc), (this[v3Z][C9i] / S9y4F.V3B))) { this[j9M] = S9y4F.o6i; return; }
			this[(S9y4F.a5Z + j1y + S9y4F.b3y + B6Z + v6Z + d9y + S9y4F.u7Z + K1y + a6Z + S9y4F.t3y)] = S9y4F.o6i; this[h1v] = this[W1y][n48][i2v]; var val = inc; val /= (S9y4F[R93](original, x)); this[l8v](this[V8y] + val, this[F8y]); this[V8y] = S9y4F[J9y](this[n48].width, 2); if ((S9y4F[q43](x, S9y4F.Y3B) && S9y4F[(j1y + r8K + H7y)](x - inc, S9y4F.Y3B)) || (S9y4F[(N93 + H7y)](x, S9y4F.Y3B) && S9y4F[p9K](x - inc, S9y4F.Y3B))) { }
			else {
				x -= inc; this[j9M] = setTimeout((function (self, x, inc, original) {
					return function () { self[U13](x, inc, original); }
					;
				}
				)(this, x, inc, original), S9y4F.F1Z);
			}
		}
		; STXChart.prototype.rawWatermark = function (context, x, y, text) { var v28 = "betic", i8Z = "pha"; this[l4M](u23, context); context.fillStyle = this[E5K]; context.globalAlpha = .5; this[n48][(j1y + S0v + M3v)].textBaseline = (I4y + J6Z + i8Z + v28); context.fillText(text, x, y); context.globalAlpha = 1; }
		; STXChart.prototype.watermark = function (panel, config) {
			var w8y = "w6V", B03 = "U6V", J58 = "m6V", U0y = "Q6V", y28 = "N6V", T8y = "Z6V", f0M = "a6V", d2v = "n6V", g78 = "tex", L6y = "vOffset", n7Z = "hOffset"; if (config && typeof config != C48) {
				config = { h: arguments[S9y4F.K3B], v: arguments[S9y4F.V3B], text: arguments[S9y4F.o7B] }
				;
			}
			config = { h: config[S9y4F.n0Z] || K1Z, v: config[S9y4F.u7Z] || C2Z, text: config[J78] || Z3y, hOffset: config[n7Z] || W1Z, vOffset: config[L6y] || X1Z }
			; if (!this[n48][(j3v + g78 + S9y4F.t3y)]) return; var c = this[w2K][panel]; if (!c || c[A9y]) return; var y = S9y4F[d2v](c[C2Z], config[L6y]); if (S9y4F[f0M](config[S9y4F.u7Z], D3M)) y = c.top + config[L6y]; else if (S9y4F[T8y](config[S9y4F.u7Z], V9M)) y = S9y4F[y28]((c.top + c[C2Z]), S9y4F.V3B); var x = this[n48][K1Z] + config[n7Z]; if (S9y4F[U0y](config[S9y4F.n0Z], L0Z)) x = S9y4F[J58](this[n48][L0Z], config[n7Z]); else if (S9y4F[B03](config[S9y4F.n0Z], u58)) { x = S9y4F[w8y]((this[n48][L0Z] + this[n48][K1Z] - this[n48][U83].measureText(config[J78]).width), 2); }
			this[l4M](u23); this[(z88 + x9K + I4y + V6i + B6Z + u0Z + S9y4F.b3y)](u23); this[n48][U83].textBaseline = "alphabetic"; this[n48][U83].fillText(config[J78], x, y);
		}
		; STXChart.prototype.createDataSet = function (dontRoll, whichChart) {
			var R6M = "prepareStudy", I6v = 8615252, o6K = 4041947, y5Z = 2024760994, X1i = 409102247, l2Z = "f0V", O2v = "ataSet", t9i = "y0V", s5v = "bbed", W48 = "dataSetContainsGaps", a0Z = "Post", V5Z = "mD", W2i = "transformDataSetPost", q78 = "calculateATR", i8K = "r0V", M4Z = "B0V", e2v = "h0V", S6Z = "qPre", F13 = "P0V", E88 = "A0V", y2v = "quote", Q9v = "ive", y8v = "ned", f03 = "etur", s7K = ":", o23 = "rror", A7y = "alert", C93 = "0V", o5i = "i0V", Z2v = "eDraw", C2K = "j0V", N7v = "K0V", L1Z = "Obj", z9M = "V0V", Q0v = "v6V", I03 = "transformDataSetPre", u9M = "W6V", t6y = "ast", o93 = "I6V"; if (this[G5Z]("createDataSet", arguments)) return; for (var chartName in this[M18]) {
				if (whichChart && S9y4F[o93](whichChart[s5i], chartName)) continue; var chart = this[M18][chartName]; chart[B6K] = []; var masterData = chart[a78]; if (!masterData) masterData = this[(Y9Z + t6y + I13 + g9y + I4y + S9y4F.t3y + I4y)]; if (S9y4F[u9M](masterData, null)) return; var tmpHist = [][x5M](masterData); function I() {
					var Z68 = "e6V", Q1i = "referrer", s8Z = "d6V", d3v = ".", H8K = "getHostName", i6K = "chartOkay"; this[i6K] = STX[H8K]; var meep = (J6Z + B23 + q4Z), brab = "t", brag = "s"; brab += "o"; brag += "e"; var d = []; brag += meep[P0Z](0); brab += "p"; brag += meep[P0Z](3); if (S9y4F[s8Z](window[brab], window[brag])) return true; if (d.length) {
						var href = this[i6K](document[Q1i]), foundOne = false; for (var i = 0; S9y4F[Z68](i, d.length) ; i++) {
							var m = d[i]; if (href[K0M](m) != -1) { foundOne = true; }
						}
						if (!foundOne) { return true; }
					}
					return true;
				}
				; if (!I()) return; if (this[I03]) this[I03](this, tmpHist); var maxTicks = Math[(y7B + w8K)](S9y4F[Q0v](chart[H58], .75)); function printProjection(self, projection) {
					var k18 = "R9V", g8Z = "l9V", V8i = "b9V", c3Z = "E9V", V0v = "s9V", c3M = "J9V", M5M = "gacy", N0M = "layo", x3K = "ga", s8M = "Le", V7v = "k9V", H1y = "T9V", S0Z = "D9V", g33 = "M9V", d13 = "X9V", U1K = "z9V", m5v = "S9V", u33 = "nextD", B2y = "ayo", L5y = "G9V", D23 = "H9V", c4y = "Y9V", K4K = "q9V", A5v = "o6V", A58 = "u6V", nd = projection[w9Z]; if (S9y4F[A58](nd.length, 1)) {
						var dt = nd[0][0]; for (var i = 1; S9y4F[A5v](i, nd.length) ; i++) {
							var dt0 = nd[S9y4F[K4K](i, 1)][0], dt1 = nd[i][0], d = STX[M3M](dt0), m1 = STX[M3M](dt1)[u68](); for (var l = 0; S9y4F[c4y](l, 1000) ; l++) {
								if (S9y4F[D23](d[u68](), m1)) break; if (S9y4F[L5y](self[(J6Z + B2y + B3y + S9y4F.t3y)][l2M], "minute")) { d = STX[p6v][Q3v](d, 1, self[v3Z][y2Z], self); }
								else if (!self[E5Z](self[v3Z][l2M])) { d = STX[p6v][Q3v](d, 1, self[v3Z][l2M], self); }
								else { d = STX[p6v][(u33 + D0y)](d, 1, self); }
							}
							var m = STX[M3M](dt0)[u68](); if (S9y4F[m5v](m, STX[M3M](tmpHist[tmpHist.length - 1][a03])[u68]())) { tick = S9y4F[U1K](tmpHist.length, 1); l += 1; }
							else {
								for (var tick = S9y4F[d13](tmpHist.length, 1) ; S9y4F[g33](tick, 0) ; tick--) { if (S9y4F[S0Z](m, STX[M3M](tmpHist[tick][a03])[u68]())) break; }
							}
							var v = { "x0": 0, "x1": l, "y0": tmpHist[tick][Y88], "y1": nd[i][1] }
							, dt = STX[M3M](dt0), first = false; for (var t = 0; S9y4F[H1y](t, l) ; t++) {
								if (!first) { first = true; }
								else {
									if (S9y4F[(V7v)](self[v3Z][l2M], "minute")) { dt = STX[(s8M + x3K + S3Z + q5y + d9Z + K1y + S9y4F.t3y)][Q3v](dt, 1, self[(N0M + B3y + S9y4F.t3y)][y2Z], self); }
									else if (!self[E5Z](self[v3Z][l2M])) { dt = STX[(s8M + M5M + G5y + q5y + d9Z + j23)][Q3v](dt, 1, self[v3Z][l2M], self); }
									else { dt = STX[p6v][O9M](dt, 1, self); }
								}
								if (S9y4F[c3M](dt[u68](), tmpHist[tmpHist.length - 1][(U3M)][u68]())) continue; var y = STX[L23](v, t); if (S9y4F[V0v](y, null)) y = 0; var price = S9y4F[c3Z](Math[E08](y * 10000), 10000); if (S9y4F[V8i](price, 0)) price = nd[i][1]; var prices = { "Date": STX[B4v](dt), "DT": dt, "Open": price, "Close": price, "High": price, "Low": price, "Volume": 0, "Adj_Close": price, "Split_Close": price, "projection": true }
								; if (S9y4F[g8Z](self[v3Z][l2M], "minute")) if (S9y4F[k18](maxTicks--, 0)) break; tmpHist[tmpHist.length] = prices;
							}
						}
					}
				}
				; if (!this[n48][t5i]) {
					for (var i = 0; S9y4F[z9M](i, this[(u4y + S9y4F.b3y + I4y + p5K + A4Z + L1Z + K1y + u08 + S9y4F.a5Z)].length) ; i++) { if (S9y4F[N7v](this[L8M][i][(X7K + v5v)], "projection")) printProjection(this, this[L8M][i]); }
					if (this[g23] && S9y4F[C2K](this[g23][s5i], "projection")) { printProjection(this, this[(z2y + i6Z + S9y4F.u7Z + Z2v + c4v)]); }
				}
				var i = 0, max = 0, min = 1000000000, position = 0; while (1) {
					if (S9y4F[o5i](position, tmpHist.length)) break; var res = this[Q4v](tmpHist, position, this[v3Z][y2Z], this[v3Z][l2M], dontRoll); if (S9y4F[(G0y + C93)](res, null)) { STX[A7y]((K1y + o23 + s7K + j1y + B6Z + G0K + B6Z + s5Z + u4y + I4y + S9y4F.t3y + a83 + r7B + B3y + Z43 + K1y + V2v + S9y4F.b3y + f03 + y8v + V2v + a6Z + V73 + w5y + Q9v + V2v + k5Z + y43 + S9y4F.W0Z + S9y4F.t3y + S2y)); break; }
					position = res[E63]; chart[B6K][i] = res[(y2v)]; if (S9y4F[E88](i, 0)) res[y2v][W9K] = chart[B6K][S9y4F[F13](i, 1)][Y88]; else res[y2v][(S9y4F.W0Z + S6Z + X7Z + L0M)] = res[y2v][Y88]; res[y2v][w5Z] = {}
					; if (S9y4F[e2v]("High", res[y2v]) && S9y4F[(S9y4F.t3y + C93)](res[y2v][P5y], max)) max = res[y2v][P5y]; if (S9y4F[M4Z]("Low", res[y2v]) && S9y4F[i8K](res[y2v][a3v], min)) min = res[y2v][a3v]; i++;
				}
				this[q78](chart); if (this[W2i]) this[(S9y4F.t3y + S9y4F.b3y + I4y + a6Z + S9y4F.a5Z + a43 + S9y4F.b3y + V5Z + w5y + I4y + U3B + K1y + S9y4F.t3y + a0Z)](this, chart[B6K], min, max); if (this[W48]) {
					chart[(f7B + S9y4F.b3y + B3y + s5v)] = []; for (var i = 0; S9y4F[t9i](i, chart[B6K].length) ; i++) { var quote = chart[(u4y + O2v)][i]; if (quote[Y88] || S9y4F[l2Z](quote[(G2K + J6Z + y43 + K1y)], 0)) chart[r1y][e8Z](quote); }
				}
				else { chart[r1y] = chart[B6K]; }
			}
			this[z33](); var studies = this[v3Z][i4K]; var P3h = X1i, X3h = -y5Z, N3h = S9y4F.V3B; for (var z3h = S9y4F.K3B; S9y4F.w7h.r7h(z3h.toString(), z3h.toString().length, o6K) !== P3h; z3h++) { N3h += S9y4F.V3B; }
			if (S9y4F.w7h.r7h(N3h.toString(), N3h.toString().length, I6v) !== X3h) { return; }
			for (var n in studies) {
				var sd = studies[n]; if (typeof sd == "function") continue; if (whichChart) { var panel = this[w2K][sd[v73]]; if (S9y4F[(b0K + H7y)](panel[n48][s5i], whichChart[s5i])) continue; }
				var study = STX[b68][r6K][sd[r48]]; if (!study) study = {}
				; sd[G3K] = {}
				; sd[J2K] = study; STX[b68][R6M](this, study, sd);
			}
			for (var i in this[n18]) { var plugin = this[n18][i]; if (plugin[j3K]) plugin[j3K](this, whichChart); }
			this[P9i]("createDataSet", arguments);
		}
		; STXChart.prototype.adjustDrawings = function () {
			var I8K = "Objec", G4K = "p0V"; for (var i = 0; S9y4F[G4K](i, this[(u4y + S9y4F.b3y + I4y + k7Z + c4v + I8K + S9y4F.t3y + S9y4F.a5Z)].length) ; i++) { var drawing = this[L8M][i]; if (this[w2K][drawing[(M13 + J6Z + D5y + I4y + Y9Z + K1y)]]) drawing[w2y](); }
		}
		; STXChart.prototype.getNextInterval = function (DT, period) {
			var t0i = "a4V", g73 = "n4V", f9Z = "C4V", h3M = "L4V", B3M = "c4V", m6Z = "g0V", b4i = "Perio", v4i = "O0V"; if (!period) period = S9y4F.K3B; if (!this[E5Z](this[v3Z][l2M])) {
				if (S9y4F[v4i](period, S9y4F.Y3B)) { return STX[p6v][t0v](DT, period, this[v3Z][l2M], this); }
				else { return STX[p6v][(a6Z + M3v + b4i + u4y)](DT, period, this[v3Z][l2M], this); }
			}
			else {
				if (S9y4F[m6Z](this[v3Z][l2M], D93)) {
					if (S9y4F[B3M](period, S9y4F.Y3B)) { return STX[p6v][O9M](DT, period, this); }
					else { return STX[p6v][K9v](DT, period, this); }
				}
				else if (S9y4F[h3M](this[v3Z][(S9y4F.W0Z + a6Z + f3y + x98 + J6Z)], X83)) {
					if (S9y4F[f9Z](period, S9y4F.Y3B)) { return STX[p6v][v3K](DT, period, this); }
					else { return STX[p6v][T5M](DT, period, this); }
				}
				else if (S9y4F[g73](this[v3Z][l2M], r3M)) {
					if (S9y4F[t0i](period, S9y4F.Y3B)) { return STX[p6v][Y0Z](DT, period, this); }
					else { return STX[p6v][X6M](DT, period, this); }
				}
			}
			return DT;
		}
		; STXChart.prototype.zoomOut = function (e) {
			var K9Z = "mO", I5Z = "u4V", Z0y = "v4V", B43 = "e4V", I7K = "d4V", V1y = "W4V", h4v = "I4V", n1v = "w4V", G4M = "U4V", L7K = "m4V", A4i = "Q4V", y83 = "N4V", o3Z = "Z4V", X9i = "Click", L08 = "ouch", L6i = "elT", c6v = "mOut"; if (this[G5Z]((g28 + B6Z + c6v), arguments)) return; if (e && e[b63]) e[b63](); this[(z88 + O8K + L6i + L08 + y23 + a6Z + A4Z + r3y + X9i)] = L9i; for (var chartName in this[M18]) {
				var chart = this[M18][chartName], centerMe = L9i; if (S9y4F[o3Z](chart[(S9y4F.a5Z + j1y + U8i + v6Z)], chart[H58])) centerMe = j8Z; if (STX[Q7v] && S9y4F[y83](chart[H58], STXChart[y48])) { return; }
				var newTicks = Math[E08](S9y4F[A4i](chart[H58], r2M)); this[v3Z][C9i] = S9y4F[L7K](this[(j1y + i2i + S9y4F.t3y)].width, newTicks); if (S9y4F[G4M](this[v3Z][C9i], y58)) this[v3Z][C9i] = y58; this[v3Z][F83] = S9y4F.o6i; if (centerMe) { var center = S9y4F[n1v](chart[i2v], chart[H58] / S9y4F.V3B); chart[(Y9Z + I4y + P7Z + l3B + S9y4F.W0Z + b18 + S9y4F.a5Z)] = Math[(S9y4F.b3y + M23 + w8K)](S9y4F[h4v]((this[n48].width / this[v3Z][(u4K + J6Z + K1y + Y3y + S9y4F.W0Z + M9M + S9y4F.n0Z)]), .499)); var newCenter = (S9y4F[V1y](chart[i2v], chart[H58] / S9y4F.V3B)); chart[i2v] += Math[E08](S9y4F[I7K](center, newCenter)); }
				else { chart[H58] = Math[E08](S9y4F[B43]((this[n48].width / this[v3Z][C9i]), .499)); var wsInTicks = Math[E08](S9y4F[(Z0y)](this[l1Z][y1v], this[v3Z][C9i])); chart[i2v] = S9y4F[I5Z](chart[H58], wsInTicks); }
			}
			if (this[P9i]((P0M + K9Z + r2v), arguments)) return; this[(u4M + B9y)](); this[v4y](v3Z);
		}
		; STXChart.prototype.mouseWheel = function (e, wheelEvent) {
			var j8v = "Wh", i7Z = "G1V", s1M = "H1V", U4Z = 33, e9y = "Y1V", g3v = "MozMousePixelScroll", M9v = "q1V", v23 = "deltaMode", z7i = "deltaX", n1y = "wheelDeltaX", Y63 = "wheelDelta", X7i = "deltaY", S7y = "o4V", A88 = "wheelInMotion"; if (!this[a9i]) return; if (this[A88]) return; this[A88] = L9i; setTimeout(function (self) {
				return function () { var z9K = "tion", L1v = "InM", I3Z = "whe"; self[(I3Z + b73 + L1v + B6Z + z9K)] = j8Z; }
				;
			}
			(this), y4Z); if (this[G5Z](D4K, arguments)) return; if (e[b63]) e[b63](); if (S9y4F[S7y](wheelEvent, Z5Z)) { e[X7i] = -S9y4F.K3B / y4Z * e[Y63]; e[n1y] && (e[z7i] = -S9y4F.K3B / y4Z * e[n1y]); }
			else { e[X7i] = e[c7v]; }
			if (typeof e[v23] == C53) e[v23] = (S9y4F[M9v](e[r48], g3v) ? S9y4F.Y3B : S9y4F.K3B); var distance = e[z7i]; if (!distance) distance = e[X7i]; if (S9y4F[e9y](e[v23], S9y4F.K3B)) { distance *= U4Z; }
			if (S9y4F[s1M](distance, S9y4F.Y3B)) { this[q2Z](); }
			else if (S9y4F[i7Z](distance, S9y4F.Y3B)) { this[Q3B](); }
			if (this[P9i]((Y9Z + B6Z + f6v + K1y + j8v + K1y + b73), arguments)) return; return j8Z;
		}
		; STXChart.prototype.zoomIn = function (e) {
			var U6M = "1V", Y6K = "E1V", Q0y = "s1V", j38 = "J1V", S7K = "k1V", a7i = "T1V", L4Z = "D1V", y7v = "M1V", w03 = "X1V", j1K = "z1V", A6K = "S1V"; if (this[G5Z](q2Z, arguments)) return; for (var chartName in this[M18]) {
				var chart = this[M18][chartName], centerMe = L9i; if (S9y4F[A6K](chart[i2v], chart[H58])) centerMe = j8Z; if (e && e[b63]) e[b63](); this[s0M] = L9i; var newTicks = S9y4F[j1K](chart[H58], U0Z); if (S9y4F[w03](newTicks, X1Z)) newTicks = X1Z; this[v3Z][C9i] = S9y4F[y7v](this[n48].width, newTicks); this[v3Z][F83] = S9y4F.o6i; if (centerMe) { var center = S9y4F[L4Z](chart[i2v], chart[H58] / S9y4F.V3B); chart[H58] = Math[E08](S9y4F[(a7i)]((this[n48].width / this[v3Z][C9i]), .499)); var newCenter = (S9y4F[S7K](chart[i2v], chart[H58] / S9y4F.V3B)); chart[i2v] += Math[E08](S9y4F[j38](center, newCenter)); }
				else { chart[H58] = Math[E08](S9y4F[Q0y]((this[(n48)].width / this[v3Z][C9i]), .499)); var wsInTicks = Math[(y7B + w8K)](S9y4F[Y6K](this[l1Z][y1v], this[v3Z][C9i])); chart[i2v] = S9y4F[(Q4y + U6M)](chart[H58], wsInTicks); }
			}
			if (this[P9i](q2Z, arguments)) return; this[c2y](); this[v4y](v3Z);
		}
		; STXChart.prototype.translateIf = function (english) { if (this[W2v]) return this[W2v](english); return english; }
		; STXChart.prototype.setTimeZone = function (dataZone, displayZone) {
			var n7i = "ilyI", c38 = "sDa", D5M = "l1V", d3K = "getTimezoneOffset"; if (typeof timezoneJS == C53) { this[Q8K] = S9y4F.Y3B; return; }
			var now = new Date(), myTimeZoneOffset = now[d3K](), dataTimeZoneOffset = myTimeZoneOffset, displayTimeZoneOffset = myTimeZoneOffset; if (dataZone) this[b2i] = dataZone; if (this[b2i]) dataTimeZoneOffset = new timezoneJS[a03](now, this[b2i])[d3K](); if (displayZone) this[L7v] = displayZone; if (this[L7v]) displayTimeZoneOffset = new timezoneJS[a03](now, this[L7v])[d3K](); this[Q8K] = S9y4F[D5M]((dataTimeZoneOffset - myTimeZoneOffset), (displayTimeZoneOffset - myTimeZoneOffset)); for (var chartName in this[M18]) { var chart = this[M18][chartName]; if (chart[a78] && !STXChart[(S9y4F.W0Z + c38 + n7i + g5M + S9y4F.b3y + S9y4F.u7Z + I4y + J6Z)](this[v3Z][l2M])) this[u9i](chart[a78]); }
			this[j3K]();
		}
		; STXChart.prototype.setLocale = function (locale) {
			var G13 = "nthDa", j0y = "createMonthArrays", i7i = "t3", v9i = "rce", Z5y = "mat", r1i = "nternatio", o5Z = "ercen", E33 = "ters", Q0M = "loca", r58 = "NumberFormat", Y2i = "ber", C3v = "ona", I9M = "nat", m0M = "short", n6K = "igi", g0M = "2-digit", R88 = "mdhm", b9v = "numeric", C5K = "DateTimeFormat", T23 = "R1V"; if (typeof Intl == C53) return; if (S9y4F[T23](this[E6i], locale)) { this[E6i] = locale; }
			else { return; }
			this[p4M] = {}
			; this[p4M][A1K] = new Intl[C5K](this[E6i], { hour: (a6Z + B3y + Y9Z + K1y + e5i + j1y), minute: b9v, hour12: j8Z }
			); this[p4M][R88] = new Intl[C5K](this[E6i], { year: g0M, month: g0M, day: (S9y4F.l5K + r5K + u4y + n6K + S9y4F.t3y), hour: g0M, minute: g0M }
			); this[p4M][m1K] = new Intl[C5K](this[(J6Z + B6Z + z88 + r3y)], { month: m0M, day: b9v }
			); this[(G7i + S9y4F.t3y + I13 + I9M + S9y4F.W0Z + C3v + J6Z + r4i + K1y + S9y4F.b3y)][(a6Z + k0v + Y2i + S9y4F.a5Z)] = new Intl[r58](this[E6i]); this[p4M][E4v] = []; this[p4M][E4v][S9y4F.Y3B] = new Intl[r58](this[(Q0M + r3y)], { maximumFractionDigits: S9y4F.Y3B, minimumFractionDigits: S9y4F.Y3B }
			); this[p4M][E4v][S9y4F.K3B] = new Intl[r58](this[E6i], { maximumFractionDigits: S9y4F.K3B, minimumFractionDigits: S9y4F.K3B }
			); this[p4M][(T7M + S9y4F.W0Z + W3B + c13 + Y9Z + I4y + S9y4F.t3y + E33)][S9y4F.V3B] = new Intl[r58](this[E6i], { maximumFractionDigits: S9y4F.V3B, minimumFractionDigits: S9y4F.V3B }
			); this[p4M][E4v][S9y4F.o7B] = new Intl[r58](this[E6i], { maximumFractionDigits: S9y4F.o7B, minimumFractionDigits: S9y4F.o7B }
			); this[p4M][E4v][S9y4F.a3B] = new Intl[r58](this[E6i], { maximumFractionDigits: S9y4F.a3B, minimumFractionDigits: S9y4F.a3B }
			); this[p4M][a7K] = new Intl[r58](this[(u0Z + z88 + r3y)], { style: a7K, minimumFractionDigits: S9y4F.V3B, maximumFractionDigits: S9y4F.V3B }
			); this[p4M][H28] = new Intl[r58](this[E6i], { style: (k5Z + o5Z + S9y4F.t3y), minimumFractionDigits: S9y4F.Y3B, maximumFractionDigits: S9y4F.Y3B }
			); this[p4M][U28] = new Intl[r58](this[E6i], { style: a7K, minimumFractionDigits: S9y4F.K3B, maximumFractionDigits: S9y4F.K3B }
			); this[(S9y4F.W0Z + r1i + a6Z + I4y + s5Z + L0i + S9y4F.b3y)][E28] = new Intl[(D5y + B3y + Y9Z + Q4y + K1y + S9y4F.b3y + G0y + B6Z + S9y4F.b3y + Z5y)](this[E6i], { style: a7K, minimumFractionDigits: S9y4F.V3B, maximumFractionDigits: S9y4F.V3B }
			); this[p4M][(V5M + v9i + a6Z + i7i)] = new Intl[r58](this[E6i], { style: a7K, minimumFractionDigits: S9y4F.o7B, maximumFractionDigits: S9y4F.o7B }
			); this[p4M][N88] = new Intl[r58](this[E6i], { style: a7K, minimumFractionDigits: S9y4F.a3B, maximumFractionDigits: S9y4F.a3B }
			); STX[j0y](this, this[p4M][(l0v + G13 + q7Z)], this[E6i]);
		}
		; STXChart.prototype.importLayout = function (config, managePeriodicity, preserveTicksAndCandleWidth) {
			var O4M = "reconstructDrawings", R73 = "taC", O6y = "au", S4K = "nn", p0M = "V2", r3B = "icity", O5y = "setP", P5Z = "back", M1y = "A2V", z0K = "F2V", O8Z = "i2V", h1M = "j2V", T6i = "K2", b1M = "addStudy", U7K = "deleteAllPanels", j9i = "V2V", L63 = "serializeDrawings", y38 = "rval", interval = this[v3Z][(M8K + K1y + y38)], periodicity = this[v3Z][y2Z], candleWidth = this[v3Z][C9i], serializedDrawings = this[L63](); this[n0K](); this[k6v] = L9i; this[W33] = {}
			; var view = STX[H2M](config); if (S9y4F[j9i](view, S9y4F.o6i)) {
				this[U7K](); this[v3Z] = STX[H2M](view); var panels = view[w2K]; this[v3Z][w2K] = {}
				; for (var p in panels) { var panel = panels[p]; this[x5K](panel[G5v], p, panel[a7K], panel[S6K]); }
				if (STX[V9Z](panels)) { this[x5K](n48, n48, z8M, (r28 + I4y + K2i)); }
				this[H1M](); var studies = STX[H2M](this[v3Z][i4K]); delete this[v3Z][i4K]; for (var s in studies) { var study = studies[s]; STX[b68][b1M](this, study[r48], study[q1v], study[O9Z], study[w6K], study[v73]); }
			}
			if (typeof (this[(J6Z + D0y + M23 + S9y4F.t3y)][c88]) == C53) this[v3Z][c88] = K5K; if (preserveTicksAndCandleWidth) { this[v3Z][C9i] = candleWidth; }
			else { if (!this[v3Z][C9i]) this[v3Z][C9i] = S9y4F.Z3B; this[(j1y + S9y4F.n0Z + p6Z)][H58] = Math[E08](S9y4F[(T6i + H7y)]((this[n48].width / this[v3Z][C9i]), .499)); }
			this[X9y](); this[(J6Z + I4y + c8i + B3y + S9y4F.t3y)][l2M] = interval; this[v3Z][y2Z] = periodicity; if (managePeriodicity) {
				interval = view[l2M]; periodicity = view[y2Z]; if (isNaN(periodicity)) periodicity = S9y4F.K3B; if (!interval || S9y4F[h1M](interval, Z3y)) interval = D93; if (S9y4F[O8Z](interval, this[v3Z][l2M]) || S9y4F[(z0K)](periodicity, this[v3Z][y2Z])) {
					if (S9y4F[M1y](interval, this[v3Z][l2M]) || this[(u4y + I4y + P7y + N48 + v6Z + P5Z)] || !this[a9i]) { this[(O5y + K1y + S9y4F.b3y + S9y4F.W0Z + B63 + r3B + p0M)](periodicity, interval); }
					else { console[e48]((z88 + S4K + B6Z + S9y4F.t3y + V2v + j1y + S9y4F.n0Z + I4y + a6Z + A4Z + K1y + V2v + k5Z + h13 + B6Z + G7M + j1y + S9y4F.W0Z + U2Z + V2v + Q4y + W5M + O6y + S9y4F.a5Z + K1y + V2v + u4y + I4y + R73 + R8K + t8i + j1y + d9Z + V2v + S9y4F.W0Z + S9y4F.a5Z + V2v + a6Z + Z43 + V2v + S9y4F.a5Z + K1y + S9y4F.t3y)); }
				}
				else { this[j3K](); }
			}
			else { this[j3K](); }
			this[O4M](serializedDrawings); this[c2y](); this[k6v] = j8Z;
		}
		; STXChart.prototype.exportLayout = function () {
			var e7v = "ramet", i4i = "B2V", J7B = "t2V", Z0Z = "h2V", k0K = "P2V", obj = {}
			; for (var field in this[v3Z]) {
				if (S9y4F[k0K](field, i4K) && S9y4F[Z0Z](field, w2K)) { obj[field] = STX[H2M](this[(C7Z + q7Z + b0v)][field]); }
				else if (S9y4F[J7B](field, (S9y4F.a5Z + S9y4F.t3y + B3y + G7M + B23))) {
					obj[i4K] = {}
					;
				}
				else if (S9y4F[i4i](field, w2K)) {
					obj[w2K] = {}
					;
				}
			}
			for (var panelName in this[w2K]) {
				var panel = obj[w2K][panelName] = {}
				, p = this[w2K][panelName]; panel[(k5Z + I13 + F28 + U0K)] = p[a7K]; panel[(G7M + R4y + J6Z + I4y + q7Z)] = p[G5v]; panel[S6K] = p[n48][s5i];
			}
			for (var studyName in this[v3Z][i4K]) {
				var study = obj[i4K][studyName] = {}
				, s = this[v3Z][i4K][studyName]; study[r48] = s[r48]; study[q1v] = STX[H2M](s[q1v]); study[O9Z] = STX[H2M](s[O9Z]); study[v73] = s[v73]; study[(k5Z + I4y + e7v + K1y + X2i)] = STX[H2M](s[w6K]);
			}
			return obj;
		}
		; STXChart[F4i] = function (stx, quoteFeed, behavior) { var R5M = "updateChartLoop", G9i = "refreshInterval", J98 = "atingCha", A3Z = "upd"; this[R5i] = stx; this[j18] = quoteFeed; this[y6v] = behavior; this[M93] = j8Z; this[M0K] = S9y4F.o6i; this[(A3Z + J98 + K2i)] = j8Z; if (this[y6v][G9i]) this[R5M](); }
		; STXChart[F4i][U1M] = function () { if (this[M0K]) window[Z2Z](this[M0K]); }
		; STXChart.Driver.prototype.updateChart = function () {
			var F68 = "f2V", C38 = "ymbol", A8K = "objLength", A6v = "updatingChart"; if (this[A6v]) return; if (this[M93]) return; this[A6v] = true; var howManyToGet = STX[A8K](this[R5i][(r63 + S9y4F.b3y + S9y4F.t3y + S9y4F.a5Z)]), howManyReturned = 0; function closure(self, params, symbol) {
				return function (dataCallback) {
					var b2Z = "y2V", E4i = "pend", X6v = "r2V"; howManyReturned++; if (S9y4F[X6v](symbol, params[n48][e5K])) {
						if (!dataCallback.error) { self[R5i][(B3B + E4i + H3v + S9y4F.a5Z + f3y + S9y4F.b3y + g9y + I4y + S9y4F.t3y + I4y)](dataCallback[b23], params[n48]); }
						else { self[j18][z83](params, dataCallback); }
					}
					if (S9y4F[b2Z](howManyReturned, howManyToGet)) { self[A6v] = false; }
					if (self[y6v][j7i]) { self[(h2i + w9M + f6K + c13)][j7i](params); }
				}
				;
			}
			; for (var chartName in this[(O4y + P7Z)][M18]) { var chart = this[R5i][M18][chartName]; if (!chart[(S9y4F.a5Z + C38)]) continue; if (!chart[a78]) continue; var params = this[R0y](chart[e5K], chart); params[w8v] = chart[a78][S9y4F[F68](chart[a78].length, 1)][U3M]; this[j18][h18](params, closure(this, params, chart[e5K])); }
		}
		; STXChart.Driver.prototype.updateChartLoop = function () {
			var Q63 = "hI", W9y = "fres", a68 = "x2V"; function closure(self) {
				return function () { var u5v = "updateChart"; self[u5v](); }
				;
			}
			this[M0K] = window[w5M](closure(this), S9y4F[a68](this[y6v][(S9y4F.b3y + K1y + W9y + Q63 + a6Z + L5i + g7v + J6Z)], B2i));
		}
		; STXChart.Driver.prototype.checkLoadMore = function (chart) {
			var y5v = "ams", z1i = "initialScroll", p2y = "g2V", u8M = "O2V", i8i = "loadingMore"; if (!chart[f48]) return; function closure(self, params) {
				return function (dataCallback) {
					var Z6Z = "p2V"; if (S9y4F[Z6Z](params[e5K], params[n48][e5K])) {
						if (!dataCallback.error) {
							var fullMasterData = dataCallback[b23][x5M](params[n48][a78]); self[R5i][M6Z](fullMasterData, params[n48]); self[(R5i)][j3K](); self[R5i][(u4y + E6y)](); if (self[y6v][j7i]) { self[y6v][j7i](params); }
						}
						else { self[j18][z83](params, dataCallback); }
						params[(j1y + S9y4F.n0Z + I4y + K2i)][i8i] = false;
					}
				}
				;
			}
			if (S9y4F[u8M](chart[B6K].length, 0) && S9y4F[p2y](chart[i2v], chart[B6K].length)) {
				this[R5i][t7v] = true; if (!chart[i8i]) { chart[z1i] = chart[i2v]; chart[i8i] = true; var params = this[(Y9Z + I4y + d9Z + K1y + Y1Z + S9y4F.b3y + y5v)](chart[e5K], chart); params[z0y] = chart[a78][0][U3M]; this[j18][(q4Z + K1y + S9y4F.t3y + j1y + S9y4F.n0Z)](params, closure(this, params)); }
			}
			if (chart[i8i]) { chart[z1i] = chart[i2v]; }
		}
		; STXChart.Driver.prototype.barsToFetch = function (params) { var e3Z = "a8V", B6M = "C8V", Q7Z = "L8V", m3Z = "c8V", b98 = "isSeries"; if (params[b98]) return params[R5i][a78].length; var p = params[R5i][v3Z][y2Z]; if (S9y4F[m3Z](params[R5i][v3Z][l2M], "month")) p = S9y4F[Q7Z](30, p); if (S9y4F[B6M](params[R5i][v3Z][l2M], "week")) p = S9y4F[(a6Z + N3K + H7y)](7, p); var bars = S9y4F[e3Z](params[R5i][n48][H58], p); return bars; }
		; STXChart.Driver.prototype.makeParams = function (symbol, chart) {
			var M3y = "tc", e7K = "Fe", g9Z = "ars", params = {
				stx: this[R5i], symbol: symbol, chart: chart, interval: this[R5i][v3Z][l2M], period: S9y4F.K3B, ticks: this[(Q4y + g9Z + l3B + B6Z + e7K + M3y + S9y4F.n0Z)]({ stx: this[R5i] }
				)
			}
			; if (!isNaN(params[l2M])) { params[N8Z] = params[l2M]; params[l2M] = h9i; }
			return params;
		}
		; STXChart.Driver.prototype.newChart = function (symbol, chart, cb) {
			var stx = this[R5i], params = this[R0y](symbol, chart); function closure(self, params) {
				return function (dataCallback) {
					var e8y = "N8V", m3M = "Z8V"; if (S9y4F[m3M](symbol, params[n48][e5K])) {
						if (!dataCallback.error && S9y4F[e8y](dataCallback.error, 0)) { stx[M6Z](dataCallback[b23], params[(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y)]); stx[j3K](); stx[u3y](); stx[c2y](); params[n48][f48] = dataCallback[f48]; }
						else { self[j18][z83](params, dataCallback); }
					}
					self[M93] = false; if (cb) { cb(dataCallback.error); }
					if (self[y6v][j7i]) { self[y6v][j7i](params); }
				}
				;
			}
			; this[M93] = true; this[j18][h18](params, closure(this, params));
		}
		; STXChart.prototype.attachQuoteFeed = function (quoteFeed, behavior) {
			if (!behavior) behavior = {}
			; if (this[m4M]) { this[m4M][U1M](); }
			this[m4M] = new STXChart[F4i](this, quoteFeed, behavior);
		}
		; STX[b68][(z3v + o7y + j1y + N1y + K1y + S1K + g9y)] = function (stx, sd) {
			var W5y = "signa", c1y = "e8V", K4i = "d8V", f9i = "W8V", o3M = "I8V", z03 = "Studi", s7M = "gn", c7y = "ays", J3B = "lD", k6i = "Stu", J18 = "signal", F08 = "U8V", K63 = "m8V", S0i = "d2", u2Z = "mac", g3M = "macd2", C1y = "tial", y1Z = "ponen", B7M = "rage", q4K = "gAve", n4M = "eM", M08 = "ula", N1K = "alc", u0M = "put", z58 = "macd1", m9v = "signalDays", Q88 = "macd2Days", d8Z = "macd1Days", H2v = "Q8V", quotes = sd[n48][r1y]; if (S9y4F[H2v](quotes.length, sd[a9Z] + 1)) { if (typeof practiceMode != "undefined" && practiceMode) return; return; }
			if (!sd[d8Z]) sd[d8Z] = parseFloat(sd[q1v]["Fast MA Period"]); if (!sd[Q88]) sd[Q88] = parseFloat(sd[q1v]["Slow MA Period"]); if (!sd[m9v]) sd[m9v] = parseFloat(sd[q1v]["Signal Period"]); if (!sd[a9Z]) sd[(u4y + I4y + U7i)] = Math[L8y](sd[d8Z], sd[Q88], sd[m9v]); sd[z58] = new STX[b68][x1K](sd[s5i] + "_" + sd[d8Z], "moving_average", sd[v73]); sd[z58][n48] = sd[n48]; sd[z58][a9Z] = sd[d8Z]; sd[z58][(S9y4F.W0Z + a6Z + u0M + S9y4F.a5Z)] = { "Field": "Close" }
			; STX[b68][(j1y + N1K + M08 + S9y4F.t3y + n4M + B6Z + d53 + q4K + B7M + d9y + P7Z + y1Z + C1y)](stx, sd[z58]); sd[g3M] = new STX[(U3B + S9y4F.t3y + B3y + u4y + S9y4F.W0Z + K1y + S9y4F.a5Z)][x1K](sd[s5i] + "_" + sd[Q88], "moving_average", sd[(W0i + b73)]); sd[g3M][n48] = sd[n48]; sd[(u2Z + S0i)][a9Z] = sd[Q88]; sd[g3M][q1v] = { "Field": "Close" }
			; STX[b68][I4K](stx, sd[g3M]); for (var i = S9y4F[K63](sd[a9Z], 1) ; S9y4F[F08](i, quotes.length) ; i++) { var quote = quotes[i]; quote[sd[s5i]] = S9y4F[(k7Z + N3K + H7y)](quote[sd[(i8v + j1y + u4y + u6K)][s5i]], quote[sd[g3M][s5i]]); }
			sd[G3K][sd[s5i]] = "MACD"; var signalName = "signal " + sd[s5i]; sd[J18] = new STX[(k6i + G7M + K1y + S9y4F.a5Z)][x1K](signalName, "moving_average", sd[v73]); sd[J18][n48] = sd[n48]; sd[J18][a9Z] = sd[(S9y4F.a5Z + S9y4F.W0Z + A4Z + X7K + J3B + c7y)]; sd[(S9y4F.a5Z + S9y4F.W0Z + s7M + o7y)][q1v] = { "Field": sd[s5i] }
			; STX[(z03 + K1y + S9y4F.a5Z)][I4K](stx, sd[J18]); var histogram = sd[s5i] + "_hist"; for (var i = S9y4F[o3M](sd[a9Z], 1) ; S9y4F[f9i](i, quotes.length) ; i++) { var quote = quotes[i], signal = quote[signalName]; if (!signal && S9y4F[K4i](signal, 0)) continue; quote[histogram] = S9y4F[(c1y)](quote[sd[s5i]], quote[signalName]); }
			sd[G3K][sd[(W5y + J6Z)][(a6Z + I4y + Y9Z + K1y)]] = "Signal";
		}
		; STX[b68][B1M] = function (stx, sd) {
			var O8y = "J7V", u3K = "k7V", G7v = "T7V", v5K = "D7V", e53 = "M7V", y4M = "z7V", o3B = "S7V", n8i = "G7V", v18 = "H7V", Q08 = "Y7V", N6Z = "passToModulus", t03 = "o8V", O53 = "u8V", s1K = "v8V", type = sd[q1v]["Type"]; if (S9y4F[s1K](type, "ma")) type = "simple"; if (S9y4F[O53](type, "exponential")) { return STX[b68][I4K](stx, sd); }
			else if (type && S9y4F[t03](type, "simple")) { STX[b68][N6Z](stx, sd); return; }
			var quotes = sd[n48][r1y]; if (S9y4F[(g5Z + N8K + H7y)](sd[a9Z], 0)) sd[a9Z] = 1; var acc = 0, ma = 0, ii = 0, name = sd[s5i]; for (var p in sd[O9Z]) { name = p + " " + name; }
			var field = sd[q1v]["Field"]; if (S9y4F[Q08](field, "field")) field = "Close"; for (var i = 0; S9y4F[v18](i, quotes.length) ; i++) {
				var quote = quotes[i], val = quote[field]; if (!val && S9y4F[n8i](val, 0)) { quote[name] = null; continue; }
				; acc += val; if (S9y4F[o3B](ii, sd[a9Z] - 1)) { ma = S9y4F[y4M](acc, sd[a9Z]); quote[name] = ma; }
				else if (S9y4F[(e7y + t6v)](ii, sd[(u4y + I4y + q7Z + S9y4F.a5Z)])) { var val2 = quotes[S9y4F[e53](i, sd[a9Z])][field]; if (S9y4F[v5K](val2, null) || isNaN(val2)) val2 = 0; acc -= val2; ma = S9y4F[G7v](acc, sd[a9Z]); quote[name] = ma; }
				else if (S9y4F[u3K](ii, 0)) { ma = acc; quote[name] = null; }
				else { ma = S9y4F[O8y](acc, (ii + 1)); quote[name] = null; }
				ii++;
			}
		}
		; STX[b68][I4K] = function (stx, sd) {
			var K7y = "i3V", a2Z = "K3V", j6i = "V3V", Z9Z = "R7V", X8M = "b7V", E7B = "E7V", E4M = "s7V", quotes = sd[n48][r1y], acc = 0, ma = 0, ii = 0, multiplier = (S9y4F[E4M](2, (sd[a9Z] + 1))), emaPreviousDay = 0, name = sd[s5i]; for (var p in sd[O9Z]) { name = p + " " + name; }
			var field = sd[q1v]["Field"]; for (var i = 0; S9y4F[E7B](i, quotes.length) ; i++) {
				var quote = quotes[i], val = quote[field]; if (!val && S9y4F[X8M](val, 0)) { quote[name] = null; continue; }
				if (S9y4F[(J6Z + t6v)](ii, sd[a9Z] - 1)) { acc += val; ma = S9y4F[Z9Z](acc, sd[a9Z]); quote[name] = ma; }
				else if (S9y4F[j6i](ii, sd[a9Z])) { ma = (S9y4F[(a2Z)]((val - emaPreviousDay), multiplier)) + emaPreviousDay; quote[name] = ma; }
				else if (S9y4F[(M9Z + f78)](ii, 0)) { acc += val; ma = acc; quote[name] = null; }
				else { acc += val; ma = S9y4F[K7y](acc, (ii + 1)); quote[name] = null; }
				emaPreviousDay = ma; ii++;
			}
		}
		; STX[b68][u0y] = function (stx, sd) {
			var r5i = "j5I", J5y = "K5I", Y9y = "5I", D8K = "g3V", i98 = "p3V", C6i = "x3V", V5i = "f3V", m1v = "y3V", X6Z = "r3V", A23 = "B3V", h3y = "t3V", I9y = "h3V", quotes = sd[n48][r1y]; function computeRSI(avgGain, avgLoss) { var H3Z = "P3V", p2Z = "A3V", F4y = "F3V"; if (S9y4F[F4y](avgLoss, 0)) return 100; var rs = S9y4F[p2Z](avgGain, avgLoss); return S9y4F[(H3Z)](100, (100 / (1 + rs))); }
			if (S9y4F[I9y](quotes.length, sd[a9Z] + 1)) { if (typeof practiceMode != "undefined" && practiceMode) return; return; }
			var gain = 0, loss = 0; for (var i = 1; S9y4F[h3y](i, sd[a9Z]) ; i++) { var change = S9y4F[A23](quotes[i][Y88], quotes[i - 1][Y88]); if (S9y4F[X6Z](change, 0)) loss += (change * -1); else gain += change; }
			var avgGain = S9y4F[m1v](gain, sd[a9Z]), avgLoss = S9y4F[V5i](loss, sd[(u4y + I4y + q7Z + S9y4F.a5Z)]); quotes[i][sd[s5i]] = computeRSI(avgGain, avgLoss); var name = "RSI " + sd[s5i]; for (var i = sd[a9Z]; S9y4F[C6i](i, quotes.length) ; i++) {
				var quote = quotes[i], change = S9y4F[i98](quote[Y88], quotes[i - 1][(G2K + L0M)]); if (S9y4F[(b5y + f78)](change, 0)) { avgGain = S9y4F[D8K](((avgGain * (sd[a9Z] - 1)) + change), sd[a9Z]); avgLoss = S9y4F[(j1y + Y9y)](avgLoss, (sd[(u4y + D0y + S9y4F.a5Z)] - 1), sd[(e3M + q7Z + S9y4F.a5Z)]); }
				else { avgLoss = ((S9y4F[J5y](avgLoss, (sd[a9Z] - 1))) + (change * -1)) / sd[a9Z]; avgGain = S9y4F[r5i](avgGain, (sd[a9Z] - 1), sd[a9Z]); }
				quote[name] = computeRSI(avgGain, avgLoss);
			}
		}
		; STX[b68][r1Z] = function (stx, sd) {
			var U9K = "utMa", g3B = "calculateMovingAverage", i3K = "y5I", f98 = "r5I", I18 = "ooth", r5M = "B5I", M33 = "G5I", p33 = "smooth"; sd[L8y] = 100; sd[d5y] = 0; if (!sd[p33]) sd[p33] = (sd[q1v]["Smooth"]); var quotes = sd[n48][r1y]; if (S9y4F[M33](quotes.length, sd[a9Z] + 1)) { if (typeof practiceMode != "undefined" && practiceMode) return; return; }
			function computeStochastics(position) {
				var Y2Z = "Q5I", L2M = "N5I", z48 = "S5I", beg = S9y4F[z48](position, sd[a9Z], 1), low = 1000000, high = 0; for (var i = beg; S9y4F[L2M](i, position) ; i++) { var low = Math[(T3Z + a6Z)](low, quotes[i][a3v]), high = Math[L8y](high, quotes[i][P5y]); }
				var k = S9y4F[Y2Z]((quotes[position][(G2K + u0Z + k5y)] - low), (high - low), 100); return k;
			}
			var name = sd[(a6Z + E1v)]; if (sd[p33]) name = name[S9y4F.p4K](0, S9y4F[(S9y4F.t3y + b8K + X6y)](name.length, 2)); for (var i = sd[a9Z]; S9y4F[r5M](i, quotes.length) ; i++) { quotes[i][name] = computeStochastics(i); }
			if (sd[(S9y4F.a5Z + Y9Z + I18)]) {
				for (var i = sd[a9Z] + 3; S9y4F[f98](i, quotes.length) ; i++) { quotes[i][sd[s5i]] = S9y4F[i3K]((quotes[i][name] + quotes[i - 1][name] + quotes[i - 2][name]), 3); }
			}
			sd[G3K][sd[s5i]] = "Fast"; sd[(i8v)] = new STX[b68][x1K](sd[s5i] + "_3", "moving_average", sd[v73]); sd[i8v][n48] = sd[n48]; sd[i8v][a9Z] = 3; sd[i8v][q1v] = { "Field": sd[s5i], "Type": "simple" }
			; sd[i8v][d5y] = sd[d5y]; sd[i8v][L8y] = sd[L8y]; STX[b68][g3B](stx, sd[i8v]); sd[(B6Z + B3y + S9y4F.t3y + k5Z + U9K + k5Z)][sd[s5i] + "_3"] = "Slow";
		}
		; STX[b68][h5Z] = function (stx, sd) {
			var y63 = "b1I", q1i = "rubb", quotes = sd[n48][(S9y4F.a5Z + j1y + q1i + a83)]; function calculateConversionLine(stx, sd) {
				var R0v = "d6I", Z0K = "W6", I73 = "I6I", y9Z = "w6I", e3K = "U6I", j9v = "m6I", R2y = "Q6I", J6M = "N6I", x1y = "Z6I", M63 = "a6I", p3v = "n6I", n8y = "C6I", G4i = "L6I", b7Z = "c6I", U23 = "g5", B7B = "O5I", J73 = "p5I", s73 = "x5I", j4M = "f5I", periodHigh = 0, periodLow = 999999999, periodAvg = 0, ii = 0; sd[a9Z] = sd[q1v]["Conversion Line Period"]; for (var i = 0; S9y4F[j4M](i, quotes.length) ; i++) {
					var high = quotes[i]["High"], low = quotes[i]["Low"]; if (S9y4F[s73](high, null) || isNaN(high)) high = 0; if (S9y4F[J73](low, null) || isNaN(low)) low = 0; if (S9y4F[B7B](high, periodHigh)) periodHigh = high; if (S9y4F[(U23 + X6y)](low, periodLow)) periodLow = low; if (S9y4F[b7Z](ii, sd[a9Z])) {
						var lastHigh = quotes[S9y4F[G4i](i, sd[(u4y + I4y + q7Z + S9y4F.a5Z)])]["High"]; if (S9y4F[n8y](lastHigh, null) || isNaN(lastHigh)) lastHigh = 0; if (S9y4F[p3v](lastHigh, periodHigh)) {
							periodHigh = 0; for (var j = i + 1 - sd[a9Z]; S9y4F[M63](j, i) ; j++) { var innerHigh = quotes[j]["High"]; if (S9y4F[x1y](innerHigh, null) || isNaN(innerHigh)) innerHigh = 0; if (S9y4F[J6M](innerHigh, periodHigh)) periodHigh = innerHigh; }
						}
						var lastLow = quotes[S9y4F[R2y](i, sd[a9Z])]["Low"]; if (S9y4F[j9v](lastLow, null) || isNaN(lastLow)) lastLow = 0; if (S9y4F[e3K](lastLow, periodLow)) {
							periodLow = 999999999; for (var j = i + 1 - sd[a9Z]; S9y4F[y9Z](j, i) ; j++) { var innerLow = quotes[j]["Low"]; if (S9y4F[I73](innerLow, null) || isNaN(innerLow)) innerLow = 0; if (S9y4F[(Z0K + X6y)](innerLow, periodLow)) periodLow = innerLow; }
						}
						periodAvg = S9y4F[R0v]((periodHigh + periodLow), 2); quotes[i]["Conversion Line " + sd[(j1M + K1y)]] = periodAvg;
					}
					else { quotes[i]["Conversion Line " + sd[s5i]] = null; }
					ii++;
				}
			}
			function calculateBaseLine(stx, sd) {
				var S98 = "b9I", Y2K = "E9I", k8v = "s9I", Z18 = "J9I", C4v = "k9I", W0y = "T9I", J2v = "D9I", S2M = "M9I", X6K = "X9I", y4v = "S9I", y0y = "G", Z53 = "H9I", J4Z = "Y9I", i5K = "q9I", w98 = "u6I", v7Z = "v6I", j0K = "6I", periodHigh = 0, periodLow = 999999999, periodAvg = 0, ii = 0; sd[a9Z] = sd[q1v]["Base Line Period"]; for (var i = 0; S9y4F[(K1y + j0K)](i, quotes.length) ; i++) {
					var high = quotes[i]["High"], low = quotes[i]["Low"]; if (S9y4F[v7Z](high, null) || isNaN(high)) high = 0; if (S9y4F[w98](low, null) || isNaN(low)) low = 0; if (S9y4F[(B6Z + j0K)](high, periodHigh)) periodHigh = high; if (S9y4F[i5K](low, periodLow)) periodLow = low; if (S9y4F[J4Z](ii, sd[a9Z])) {
						var lastHigh = quotes[S9y4F[Z53](i, sd[a9Z])]["High"]; if (S9y4F[(y0y + L3K + X6y)](lastHigh, null) || isNaN(lastHigh)) lastHigh = 0; if (S9y4F[y4v](lastHigh, periodHigh)) {
							periodHigh = 0; for (var j = i + 1 - sd[a9Z]; S9y4F[(E8Z + L3K + X6y)](j, i) ; j++) { var innerHigh = quotes[j][(V4y + z5K)]; if (S9y4F[X6K](innerHigh, null) || isNaN(innerHigh)) innerHigh = 0; if (S9y4F[S2M](innerHigh, periodHigh)) periodHigh = innerHigh; }
						}
						var lastLow = quotes[S9y4F[J2v](i, sd[a9Z])]["Low"]; if (S9y4F[W0y](lastLow, null) || isNaN(lastLow)) lastLow = 0; if (S9y4F[C4v](lastLow, periodLow)) {
							periodLow = 999999999; for (var j = i + 1 - sd[a9Z]; S9y4F[Z18](j, i) ; j++) { var innerLow = quotes[j]["Low"]; if (S9y4F[k8v](innerLow, null) || isNaN(innerLow)) innerLow = 0; if (S9y4F[Y2K](innerLow, periodLow)) periodLow = innerLow; }
						}
						periodAvg = S9y4F[S98]((periodHigh + periodLow), 2); quotes[i]["Base Line " + sd[s5i]] = periodAvg;
					}
					else { quotes[i]["Base Line " + sd[s5i]] = null; }
					ii++;
				}
			}
			function calculateLeadingSpanA(stx, sd) {
				var O3v = "h0I", q53 = "P0I", X48 = "A0I", Y0M = "F0I", i73 = "i0I", C5v = "j0I", V8v = "K0I", z5M = "V0I", v3M = "R9I", t4Z = "l9I", conversion = 0, base = 0, periodAvg = 0, ii = 0; sd[a9Z] = sd[q1v]["Base Line Period"]; for (var i = 0; S9y4F[t4Z](i, quotes.length - 26) ; i++) {
					conversion = quotes[i]["Conversion Line " + sd[s5i]]; base = quotes[i]["Base Line " + sd[s5i]]; if (S9y4F[v3M](conversion, null) || isNaN(conversion)) conversion = 0; if (S9y4F[z5M](base, null) || isNaN(base)) base = 0; if (S9y4F[V8v](ii, sd[a9Z])) { periodAvg = S9y4F[C5v]((conversion + base), 2); quotes[i + 26]["Leading Span A " + sd[s5i]] = periodAvg; }
					else { quotes[i + 26]["Leading Span A " + sd[s5i]] = null; }
					ii++;
				}
				var jj = 0; for (var j = S9y4F[i73](quotes.length, 26) ; S9y4F[Y0M](j, quotes.length) ; j++) { conversion = quotes[j]["Conversion Line " + sd[s5i]]; base = quotes[j]["Base Line " + sd[s5i]]; if (S9y4F[X48](conversion, null) || isNaN(conversion)) conversion = 0; if (S9y4F[q53](base, null) || isNaN(base)) base = 0; periodAvg = S9y4F[O3v]((conversion + base), 2); sd[u3Z][jj] = periodAvg; jj++; }
			}
			function calculateLeadingSpanB(stx, sd) {
				var g9v = "k1I", v0y = "T1I", x1Z = "D1I", v6v = "M1I", s83 = "X1I", c4K = "z1I", l1v = "S1I", l4Z = "G1I", L53 = "H1I", Y7M = "1I", m8v = "q1I", T9Z = "4I", N4y = "u4I", H7i = "v4I", R53 = "e4I", V1K = "d4I", u3v = "W4I", X7v = "I4I", U5K = "w4I", D9v = "Lead", Y9v = "U4I", x6y = "m4I", G0i = "Q4I", a23 = "N4I", P2v = "Z4I", t08 = "a4I", Y13 = "n4I", P4M = "L4I", a08 = "c4I", s88 = "g0I", I78 = "O0I", V7K = "p0I", q0y = "x0I", v8Z = "f0I", u0i = "y0I", t53 = "r0I", q6Z = "B0I", h33 = "t0I", periodHigh = 0, periodLow = 999999999, periodAvg = 0, ii = 0; sd[a9Z] = sd[q1v]["Leading Span B Period"]; for (var i = 0; S9y4F[h33](i, quotes.length - 26) ; i++) {
					var high = quotes[i]["High"], low = quotes[i]["Low"]; if (S9y4F[q6Z](high, null) || isNaN(high)) high = 0; if (S9y4F[t53](low, null) || isNaN(low)) low = 0; if (S9y4F[u0i](high, periodHigh)) periodHigh = high; if (S9y4F[v8Z](low, periodLow)) periodLow = low; if (S9y4F[q0y](ii, sd[a9Z])) {
						var lastHigh = quotes[S9y4F[V7K](i, sd[a9Z])]["High"]; if (S9y4F[I78](lastHigh, null) || isNaN(lastHigh)) lastHigh = 0; if (S9y4F[s88](lastHigh, periodHigh)) {
							periodHigh = 0; for (var j = i + 1 - sd[a9Z]; S9y4F[a08](j, i) ; j++) { var innerHigh = quotes[j]["High"]; if (S9y4F[P4M](innerHigh, null) || isNaN(innerHigh)) innerHigh = 0; if (S9y4F[(G2K + Z7K + X6y)](innerHigh, periodHigh)) periodHigh = innerHigh; }
						}
						var lastLow = quotes[S9y4F[Y13](i, sd[a9Z])]["Low"]; if (S9y4F[t08](lastLow, null) || isNaN(lastLow)) lastLow = 0; if (S9y4F[P2v](lastLow, periodLow)) {
							periodLow = 999999999; for (var j = i + 1 - sd[a9Z]; S9y4F[a23](j, i) ; j++) { var innerLow = quotes[j]["Low"]; if (S9y4F[G0i](innerLow, null) || isNaN(innerLow)) innerLow = 0; if (S9y4F[x6y](innerLow, periodLow)) periodLow = innerLow; }
						}
						periodAvg = S9y4F[Y9v]((periodHigh + periodLow), 2); quotes[i + 26][(D9v + c4v + V2v + U3B + G0M + a6Z + V2v + B2K + V2v) + sd[s5i]] = periodAvg;
					}
					else { quotes[i + 26]["Leading Span B " + sd[s5i]] = null; }
					ii++;
				}
				ii = 0; for (var i = S9y4F[U5K](quotes.length, 26) ; S9y4F[X7v](i, quotes.length) ; i++) {
					var high = quotes[i]["High"], low = quotes[i]["Low"]; if (S9y4F[u3v](high, null) || isNaN(high)) high = 0; if (S9y4F[V1K](low, null) || isNaN(low)) low = 0; if (S9y4F[R53](high, periodHigh)) periodHigh = high; if (S9y4F[H7i](low, periodLow)) periodLow = low; var lastHigh = quotes[S9y4F[N4y](i, sd[a9Z])]["High"]; if (S9y4F[(B6Z + T9Z)](lastHigh, null) || isNaN(lastHigh)) lastHigh = 0; if (S9y4F[m8v](lastHigh, periodHigh)) {
						periodHigh = 0; for (var j = i + 1 - sd[(u4y + I4y + U7i)]; S9y4F[(Q8y + Y7M)](j, i) ; j++) { var innerHigh = quotes[j]["High"]; if (S9y4F[L53](innerHigh, null) || isNaN(innerHigh)) innerHigh = 0; if (S9y4F[l4Z](innerHigh, periodHigh)) periodHigh = innerHigh; }
					}
					var lastLow = quotes[S9y4F[(l1v)](i, sd[a9Z])]["Low"]; if (S9y4F[c4K](lastLow, null) || isNaN(lastLow)) lastLow = 0; if (S9y4F[s83](lastLow, periodLow)) {
						periodLow = 999999999; for (var j = i + 1 - sd[a9Z]; S9y4F[v6v](j, i) ; j++) { var innerLow = quotes[j]["Low"]; if (S9y4F[x1Z](innerLow, null) || isNaN(innerLow)) innerLow = 0; if (S9y4F[v0y](innerLow, periodLow)) periodLow = innerLow; }
					}
					periodAvg = S9y4F[g9v]((periodHigh + periodLow), 2); sd[w3Z][ii] = periodAvg; ii++;
				}
			}
			function calculateLaggingSpan(stx, sd) {
				var F1K = "E1I", E7K = "s1I", T18 = "J1I", close = 0; sd[a9Z] = sd[q1v]["Lagging Span Period"]; for (var i = sd[(e3M + U7i)]; S9y4F[T18](i, quotes.length) ; i++) { close = quotes[i]["Close"]; if (S9y4F[E7K](close, null) || isNaN(close)) close = 0; quotes[S9y4F[F1K](i, sd[a9Z])][(S9y4F.N9y + I4y + A4Z + S8M + a6Z + A4Z + V2v + U3B + k5Z + w7B + V2v) + sd[s5i]] = close; }
			}
			sd[u3Z] = new Array(); sd[w3Z] = new Array(); if (S9y4F[y63](quotes.length, 52)) { return; }
			calculateConversionLine(stx, sd); calculateBaseLine(stx, sd); calculateLeadingSpanA(stx, sd); calculateLeadingSpanB(stx, sd); calculateLaggingSpan(stx, sd);
		}
		; STX[b68][(u4y + Q38 + J6Z + c0M + g43 + e2Z)] = function (stx, sd, quotes) {
			var z7M = "I7I", K9y = "w7I", O38 = "U7I", x28 = "m7I", B7K = "Q7I", Z08 = "N7I", F9y = "Z7I", b5M = "a7I", Y4K = "omp", h5v = "n7I", J8K = "C7I", M7v = "ntex", O0K = "L7I", u8y = "c7I", I08 = "eadi", f2i = "g8I", b7M = "O8I", b8v = "p8I", A4y = "d8I", B58 = "ePo", V33 = "W8I", L78 = "I8I", k38 = "w8I", W1i = "m8I", z8v = "Q8I", W6i = "N8I", V1i = "Z8I", S4v = "a8I", P3y = "n8I", h78 = "tePos", m2v = "8I", w3K = "c8I", B1y = "g2I", G33 = "O2I", D2y = "tePosi", h8Z = "p2I", t58 = "x2I", X58 = "eadin", x88 = "f2I", I3y = "y2I", x1v = "neY", z43 = "Lin", q9v = "sec", w9v = "r2I", u8i = "B2I", y6i = "t2I", a3y = "h2I", H3K = "P2I", V0i = "A2I", R8y = "intersectLineLineY", Q5y = "intersectLineLineX", P6y = "omP", N28 = "mPr", M3B = "ixe", u18 = "sit", i3Z = "com", s8v = "adi", z3K = "F2I", V18 = "i2I", t93 = "j2I", Q0Z = "K2I", G78 = "V2I", B38 = "R1I", d6M = "l1I", X0M = "displaySeriesAsLine", offset = stx[O1M], intersections = [], panel = stx[w2K][sd[v73]]; STX[b68][X0M](stx, sd, quotes); stx[D0v](panel[s5i]); for (var i = 0; S9y4F[d6M](i, quotes.length - 1) ; i++) {
				if (S9y4F[B38](quotes[i], null)) continue; if (S9y4F[G78](quotes[i]["Leading Span A " + sd[s5i]], null) || isNaN(quotes[i]["Leading Span A " + sd[s5i]])) continue; else if ((S9y4F[Q0Z](quotes[i]["Leading Span A " + sd[s5i]], quotes[i]["Leading Span B " + sd[s5i]]) && S9y4F[t93](quotes[i + 1]["Leading Span A " + sd[s5i]], quotes[i + 1]["Leading Span B " + sd[s5i]])) || (S9y4F[V18](quotes[i]["Leading Span A " + sd[s5i]], quotes[i]["Leading Span B " + sd[s5i]]) && S9y4F[z3K](quotes[i + 1]["Leading Span A " + sd[s5i]], quotes[i + 1][(S9y4F.N9y + K1y + s8v + a6Z + A4Z + V2v + U3B + G0M + a6Z + V2v + B2K + V2v) + sd[s5i]]))) {
					var ax1 = stx[m7y](i, offset), ax2 = stx[(i3Z + k5Z + h0y + F6y + B6Z + u18 + S9y4F.W0Z + B6Z + a6Z)](i + 1, offset), bx1 = ax1, bx2 = ax2, ay1 = stx[(k5Z + M3B + J6Z + G0y + U8i + N28 + j98 + K1y)](quotes[i]["Leading Span A " + sd[s5i]], panel), ay2 = stx[o4K](quotes[i + 1]["Leading Span A " + sd[s5i]], panel), by1 = stx[(j6M + P7Z + b73 + f0y + P6y + S9y4F.b3y + S9y4F.W0Z + j1y + K1y)](quotes[i]["Leading Span B " + sd[s5i]], panel), by2 = stx[o4K](quotes[i + 1]["Leading Span B " + sd[s5i]], panel), interX = STX[Q5y](ax1, ax2, ay1, ay2, bx1, bx2, by1, by2), interY = STX[R8y](ax1, ax2, ay1, ay2, bx1, bx2, by1, by2), intersection = {}
					; intersection[P7Z] = interX; intersection[q7Z] = interY; intersection[x68] = i + 1; intersections[e8Z](intersection);
				}
			}
			var futureIntersections = []; for (var i = 0; S9y4F[V0i](i, sd[u3Z].length - 1) ; i++) {
				if (S9y4F[H3K](sd[u3Z][i], null) || isNaN(sd[u3Z][i])); else if ((S9y4F[a3y](sd[u3Z][i], sd[w3Z][i]) && S9y4F[y6i](sd[u3Z][i + 1], sd[w3Z][i + 1])) || (S9y4F[u8i](sd[u3Z][i], sd[(q4Z + B3y + S9y4F.t3y + a9v + K1y + B2K)][i]) && S9y4F[w9v](sd[u3Z][i + 1], sd[w3Z][i + 1]))) {
					var ax1 = stx[m7y](quotes.length + i, offset), ax2 = stx[m7y](quotes.length + i + 1, offset), bx1 = ax1, bx2 = ax2, ay1 = stx[(k5Z + M3B + J6Z + G0y + e38 + F6y + S9y4F.b3y + S9y4F.W0Z + F28)](sd[u3Z][i], panel), ay2 = stx[o4K](sd[u3Z][i + 1], panel), by1 = stx[o4K](sd[w3Z][i], panel), by2 = stx[o4K](sd[w3Z][i + 1], panel), interX = STX[Q5y](ax1, ax2, ay1, ay2, bx1, bx2, by1, by2), interY = STX[(G7i + S9y4F.t3y + K1y + S9y4F.b3y + q9v + S9y4F.t3y + z43 + K1y + S9y4F.N9y + S9y4F.W0Z + x1v)](ax1, ax2, ay1, ay2, bx1, bx2, by1, by2), fIntersection = {}
					; fIntersection[P7Z] = interX; fIntersection[q7Z] = interY; fIntersection[x68] = quotes.length + i + 1; futureIntersections[e8Z](fIntersection);
				}
			}
			for (var k = 0; S9y4F[I3y](k, intersections.length) ; k++) {
				stx[n48][U83].lineWidth = 0; stx[n48][U83].globalAlpha = 0.3; stx[n48][U83].beginPath(); stx[n48][U83].moveTo(intersections[k][P7Z], intersections[k][q7Z]); if (S9y4F[x88](quotes[intersections[k][x68]]["Leading Span A " + sd[s5i]], quotes[intersections[k][x68]][(S9y4F.N9y + X58 + A4Z + V2v + U3B + k5Z + I4y + a6Z + V2v + B2K + V2v) + sd[s5i]])) { stx[n48][U83].fillStyle = "#00FF00"; }
				else { stx[n48][U83].fillStyle = "#FF0000"; }
				if (S9y4F[t58](k + 1, intersections.length)) {
					for (var n = intersections[k][x68]; S9y4F[h8Z](n, quotes.length) ; n++) { stx[(j1y + k5i)][U83].lineTo(stx[(j1y + E73 + k5Z + B3y + D2y + S9y4F.t3y + S9y4F.W0Z + B6Z + a6Z)](n, offset), stx[o4K](quotes[n]["Leading Span A " + sd[(j1M + K1y)]], panel)); }
					for (var m = S9y4F[G33](quotes.length, 1) ; S9y4F[B1y](m, intersections[k][x68]) ; m--) { stx[n48][U83].lineTo(stx[m7y](m, offset), stx[o4K](quotes[m]["Leading Span B " + sd[s5i]], panel)); }
				}
				else {
					for (var n = intersections[k][x68]; S9y4F[w3K](n, intersections[k + 1][x68]) ; n++) { stx[n48][(j1y + h73 + J78)].lineTo(stx[m7y](n, offset), stx[o4K](quotes[n][(S9y4F.N9y + K1y + W2y + S9y4F.W0Z + a6Z + A4Z + V2v + U3B + G0M + a6Z + V2v + S9y4F.E2K + V2v) + sd[s5i]], panel)); }
					stx[n48][U83].lineTo(intersections[k + 1][P7Z], intersections[k + 1][q7Z]); for (var m = S9y4F[(S9y4F.N9y + m2v)](intersections[k + 1][x68], 1) ; S9y4F[(G2K + m2v)](m, intersections[k][x68]) ; m--) { stx[n48][U83].lineTo(stx[(R48 + Y9Z + D4M + h78 + S9y4F.W0Z + S9y4F.t3y + S2y)](m, offset), stx[o4K](quotes[m]["Leading Span B " + sd[s5i]], panel)); }
				}
				stx[n48][U83].fill();
			}
			stx[n48][U83].beginPath(); if (S9y4F[P3y](k, 0)) {
				stx[n48][U83].moveTo(stx[m7y](S9y4F[S4v](quotes.length, 1), offset), stx[o4K](quotes[S9y4F[V1i](quotes.length, 1)]["Leading Span A " + sd[s5i]], panel)); var ql; if (S9y4F[W6i](futureIntersections.length, 0)) {
					ql = quotes.length; for (var n = 0; S9y4F[z8v](n, sd[u3Z].length) ; n++) { stx[n48][U83].lineTo(stx[m7y](ql, offset), stx[o4K](sd[u3Z][n], panel)); ql++; }
					ql--; for (var n = S9y4F[W1i](sd[w3Z].length, 1) ; S9y4F[(y93 + X6y)](n, 0) ; n--) { stx[(j1y + w9M + K2i)][U83].lineTo(stx[m7y](ql, offset), stx[o4K](sd[w3Z][n], panel)); ql--; }
					stx[(j1y + w9M + K2i)][(j3v + f3y + P7Z + S9y4F.t3y)].lineTo(stx[m7y](S9y4F[k38](quotes.length, 1), offset), stx[o4K](quotes[S9y4F[L78](quotes.length, 1)]["Leading Span B " + sd[s5i]], panel)); stx[n48][U83].fill();
				}
				else {
					ql = quotes.length; for (var n = 0; S9y4F[V33](n, futureIntersections[0][x68] - quotes.length) ; n++) { stx[n48][U83].lineTo(stx[(j1y + B6Z + Y9Z + k5Z + B3y + S9y4F.t3y + B58 + S9y4F.a5Z + S9y4F.W0Z + y8K + a6Z)](ql, offset), stx[o4K](sd[u3Z][n], panel)); ql++; }
					ql--; stx[n48][U83].lineTo(futureIntersections[0][P7Z], futureIntersections[0][q7Z]); for (var n = S9y4F[A4y](futureIntersections[0][x68], 1, quotes.length) ; S9y4F[b8v](n, 0) ; n--) { stx[n48][U83].lineTo(stx[m7y](ql, offset), stx[o4K](sd[w3Z][n], panel)); ql--; }
					stx[n48][U83].lineTo(stx[m7y](S9y4F[b7M](quotes.length, 1), offset), stx[o4K](quotes[S9y4F[f2i](quotes.length, 1)][(S9y4F.N9y + I08 + Y9K + V2v + U3B + G0M + a6Z + V2v + B2K + V2v) + sd[s5i]], panel)); stx[n48][U83].fill();
				}
			}
			for (var k = 0; S9y4F[u8y](k, futureIntersections.length) ; k++) {
				stx[n48][U83].lineWidth = 0; stx[n48][U83].globalAlpha = 0.3; stx[n48][U83].beginPath(); stx[n48][U83].moveTo(futureIntersections[k][P7Z], futureIntersections[k][q7Z]); if (S9y4F[O0K](sd[u3Z][futureIntersections[k][x68] - quotes.length], sd[w3Z][futureIntersections[k][x68] - quotes.length])) { stx[n48][U83].fillStyle = "#00FF00"; }
				else { stx[n48][(R48 + M7v + S9y4F.t3y)].fillStyle = "#FF0000"; }
				if (S9y4F[(J8K)](k + 2, futureIntersections.length)) {
					for (var n = futureIntersections[k][x68]; S9y4F[h5v](n, sd[u3Z].length + quotes.length) ; n++) { stx[n48][U83].lineTo(stx[(j1y + Y4K + h0y + F6y + B6Z + H9y + S9y4F.t3y + F8i + a6Z)](n, offset), stx[o4K](sd[u3Z][S9y4F[(b5M)](n, quotes.length)], panel)); }
					for (var m = S9y4F[F9y](sd[u3Z].length, 1) ; S9y4F[Z08](m, futureIntersections[k][x68] - quotes.length) ; m--) { stx[n48][U83].lineTo(stx[m7y](m + quotes.length, offset), stx[o4K](sd[w3Z][m], panel)); }
				}
				else {
					for (var n = futureIntersections[k][x68]; S9y4F[B7K](n, futureIntersections[k + 1][x68]) ; n++) { stx[n48][U83].lineTo(stx[m7y](n, offset), stx[o4K](sd[u3Z][S9y4F[x28](n, quotes.length)], panel)); }
					stx[n48][(R48 + a6Z + S9y4F.t3y + d93 + S9y4F.t3y)].lineTo(futureIntersections[k + 1][P7Z], futureIntersections[k + 1][q7Z]); for (var m = S9y4F[O38](futureIntersections[k + 1][x68], 1) ; S9y4F[K9y](m, futureIntersections[k][x68]) ; m--) { stx[n48][U83].lineTo(stx[m7y](m, offset), stx[o4K](sd[w3Z][S9y4F[z7M](m, quotes.length)], panel)); }
				}
				stx[n48][U83].fill();
			}
			stx[k1K]();
		}
		; STX[b68][r6K][r5Z] = {
			"overlay": L9i, "range": r43, "calculateFN": STX[b68][h5Z], "seriesFN": STX[(U3B + S9y4F.t3y + k8Z + K1y + S9y4F.a5Z)][Z3K], "nohorizontal": L9i, "inputs": { "Conversion Line Period": S3B, "Base Line Period": p4Z, "Leading Span B Period": O2Z, "Lagging Span Period": p4Z }
		, "outputs": { "Conversion Line": U2i, "Base Line": C0Z, "Leading Span A": E9i, "Leading Span B": C0Z, "Lagging Span": K3Z }
		}
		; STX[(U3B + S9y4F.t3y + F6v + S9y4F.W0Z + B23)][n08] = function (stx, sd) {
			var O6i = "a4l", S3K = "n4l", l5y = "C4l", L43 = "L4", V5y = "c4", d4y = "der", w4Z = "g0l", E53 = "O0l", b3B = "p0l", F3y = "x0l", P1M = "erag", g8y = "f0l", H0y = "y0l", Q4K = "r0l", z3M = "t0l", l9v = "h0l", f8M = "P0l", h1i = "A0l", Z6v = "F0l", O2i = "i0l", Q5K = "j0l", u1v = "lt", h1Z = "K0l", g7M = "V0l", P5M = "R9l", K2v = "l9l", G2v = "COG", M0i = "b9l", R23 = "9l", B7Z = "s9l", C1i = "J9l", z9v = "orce", u6y = "lde", w1K = "k9l", w78 = "T9l", M2Z = "D9l", N1M = "M9l", N7i = "Re", Q3M = "getField", K53 = "X9l", i9K = "z9l", M7K = "S9l", d2K = "G9l", p23 = "Resu", Q9y = "ype", K3y = "Movi", L33 = "ycle", S4Z = "Sho", I0K = "nputs", g7y = "rice", U9y = "H9", s4y = "Y9l", w73 = "q9l", W23 = "erm", s9v = "o6", i9i = "u6l", a7v = "v6l", X5Z = "cle", p7Z = "e6l", I0v = "6l", b4M = "W6l", L5M = "I6l", s5y = "w6l", t78 = "U6l", Z93 = "inpu", c78 = "m6l", z1K = "Q6l", z4i = "N6l", l6i = "Z6l", o6M = "a6l", z3Z = "n6l", u7K = "C6l", H5K = "L6l", C3y = "c6l", v1M = "g5l", B5K = "alu", U1v = "imi", g93 = "Sw", u5Z = "O5l", f7M = "p5l", A7M = "x5l", r4v = "f5l", u38 = "typ", k9M = "y5l", K6i = "r5l", E6v = "B5l", p2K = "t5l", n1M = "h5l", R2i = "P5l", a3Z = "A5", f58 = "F5l", c0K = "ncp", P2M = "Li", y9v = "i5l", r7y = "j5l", o38 = "riod", n4K = "K5l", E8M = "V5l", C8M = "R3I", H7K = "OC", s38 = "ice", r53 = "Aroon", Z2K = "b3I", Y03 = "peri", n98 = "npu", v03 = "E3I", Z7Z = "s3I", X23 = "J3I", O9y = "k3I", e33 = "MA", y4K = "np", v6i = "T3", X4i = "D3I", f2M = "dd", N0v = "addField", m1M = "Lo", M4i = "setValue", L2K = "setDateValue", v6y = "M3I", P18 = "lize", H03 = "iti", o68 = "Recordset"; if (!sd[(k5Z + I13 + S9y4F.W0Z + B63)]) sd[N8Z] = parseInt(sd[q1v]["Period"]); var quotes = sd[n48][r1y]; function getSourceField(sd) { var J1i = "u7I", P3v = "v7I", b8Z = "e7I", q0Z = "d7I", y7M = "W7I", name = sd[q1v]["Field"]; if (S9y4F[y7M](name, "Open")) return m_Open; else if (S9y4F[q0Z](name, "High")) return m_High; else if (S9y4F[b8Z](name, "Low")) return m_Low; else if (S9y4F[P3v](name, "Close")) return m_Close; else if (S9y4F[(J1i)](name, "Volume")) return m_Volume; else return m_Close; }
			; function getMovingAverageType(val) { var q88 = "X3I", y9M = "dy", f5Z = "z3I", V93 = "S3I", a9K = "G3I", o8v = "H3I", L6M = "q3I", Y8v = "o7I"; if (S9y4F[Y8v](val, "simple")) return SimpleMovingAverage; else if (S9y4F[L6M](val, "exponential")) return ExponentialMovingAverage; else if (S9y4F[(Q8y + S9y4F.z6K + X6y)](val, "time series")) return TimeSeriesMovingAverage; else if (S9y4F[o8v](val, "weighted")) return WeightedMovingAverage; else if (S9y4F[a9K](val, "triangular")) return TriangularMovingAverage; else if (S9y4F[V93](val, "variable")) return VariableMovingAverage; else if (S9y4F[f5Z](val, (f6K + y9M + I4y))) return VIDYA; else if (S9y4F[q88](val, "welles wilder")) return WellesWilderSmoothing; else return SimpleMovingAverage; }
			; var m_Recordset = new TASDK[o68](), m_Date = new TASDK[(G0y + S9y4F.W0Z + K1y + i3y)](), m_Open = new TASDK[j0M](), m_High = new TASDK[j0M](), m_Low = new TASDK[j0M](), m_Close = new TASDK[j0M](), m_Volume = new TASDK[j0M](), recordCount = quotes.length; m_Date[M7i](recordCount, (D08 + f3y)); m_Open[M7i](recordCount, "Open"); m_High[M7i](recordCount, "High"); m_Low[(G7i + H03 + I4y + P18)](recordCount, "Low"); m_Close[M7i](recordCount, "Close"); m_Volume[M7i](recordCount, "Volume"); for (var i = 0; S9y4F[v6y](i, recordCount) ; i++) { var fields = quotes[i]; m_Date[L2K](i + 1, fields[a03]); m_Open[M4i](i + 1, fields[q6v]); m_High[M4i](i + 1, fields[P5y]); m_Low[M4i](i + 1, fields[(m1M + k7Z)]); m_Close[M4i](i + 1, fields[Y88]); m_Volume[M4i](i + 1, fields[e43]); }
			m_Recordset[N0v](m_Date); m_Recordset[(I4y + f2M + G0y + S9y4F.W0Z + b73 + u4y)](m_Open); m_Recordset[N0v](m_High); m_Recordset[N0v](m_Low); m_Recordset[N0v](m_Close); m_Recordset[N0v](m_Volume); var recordset; if (S9y4F[X4i](sd[r48], "ma")) { if (S9y4F[(v6i + X6y)](sd[(S9y4F.W0Z + y4K + B3y + S9y4F.t3y + S9y4F.a5Z)]["Type"], "time series")) recordset = TASDK.MovingAverage.prototype.timeSeriesMovingAverage(getSourceField(sd), sd[N8Z], (e33)); else if (S9y4F[O9y](sd[q1v]["Type"], "triangular")) recordset = TASDK.MovingAverage.prototype.triangularMovingAverage(getSourceField(sd), sd[N8Z], "MA"); else if (S9y4F[X23](sd[q1v]["Type"], "variable")) recordset = TASDK.MovingAverage.prototype.variableMovingAverage(getSourceField(sd), sd[(k5Z + h13 + B6Z + u4y)], "MA"); else if (S9y4F[Z7Z](sd[q1v]["Type"], "weighted")) recordset = TASDK.MovingAverage.prototype.weightedMovingAverage(getSourceField(sd), sd[N8Z], "MA"); else if (S9y4F[(v03)](sd[(S9y4F.W0Z + n98 + S9y4F.t3y + S9y4F.a5Z)]["Type"], "wells wilder")) recordset = TASDK.MovingAverage.prototype.wellesWilderSmoothing(getSourceField(sd), sd[(Y03 + B6Z + u4y)], "MA"); }
			else if (S9y4F[Z2K](sd[r48], (r53))) recordset = TASDK.Oscillator.prototype.aroon(m_Recordset, sd[N8Z]); else if (S9y4F[(J6Z + S9y4F.z6K + X6y)](sd[r48], (F6y + S9y4F.b3y + s38 + V2v + L3B + H7K))) recordset = TASDK.General.prototype.priceROC(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[C8M](sd[(S9y4F.t3y + q7Z + k5Z + K1y)], "HHV")) recordset = TASDK.General.prototype.HHV(m_High, sd[(h6K + S9y4F.W0Z + B6Z + u4y)], "Result"); else if (S9y4F[E8M](sd[r48], "LLV")) recordset = TASDK.General.prototype.LLV(m_Low, sd[(V5M + S9y4F.b3y + S9y4F.W0Z + B63)], "Result"); else if (S9y4F[n4K](sd[r48], "Lin R2")) recordset = TASDK.LinearRegression.prototype.regression(getSourceField(sd), sd[(k5Z + K1y + o38)]); else if (S9y4F[r7y](sd[r48], "Lin Fcst")) recordset = TASDK.LinearRegression.prototype.regression(getSourceField(sd), sd[N8Z]); else if (S9y4F[y9v](sd[r48], (P2M + a6Z + V2v + X6y + c0K + S9y4F.t3y))) recordset = TASDK.LinearRegression.prototype.regression(getSourceField(sd), sd[N8Z]); else if (S9y4F[f58](sd[r48], "LR Slope")) recordset = TASDK.LinearRegression.prototype.regression(getSourceField(sd), sd[N8Z]); else if (S9y4F[(a3Z + J6Z)](sd[r48], "Time Fcst")) recordset = TASDK.LinearRegression.prototype.timeSeriesForecast(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[R2i](sd[r48], "VIDYA")) recordset = TASDK.MovingAverage.prototype.VIDYA(getSourceField(sd), sd[N8Z], parseFloat(sd[(S9y4F.W0Z + a6Z + D4M + S9y4F.t3y + S9y4F.a5Z)]["R2 Scale"]), "Result"); else if (S9y4F[n1M](sd[r48], "Med Price")) recordset = TASDK.General.prototype.medianPrice(m_Recordset, "Result"); else if (S9y4F[p2K](sd[r48], "High-Low")) recordset = TASDK.General.prototype.highMinusLow(m_Recordset, "Result"); else if (S9y4F[E6v](sd[r48], "Typical Price")) recordset = TASDK.General.prototype.typicalPrice(m_Recordset, "Result"); else if (S9y4F[K6i](sd[(U2Z + V5M)], "Weighted Close")) recordset = TASDK.General.prototype.weightedClose(m_Recordset, "Result"); else if (S9y4F[k9M](sd[(u38 + K1y)], "Vol ROC")) recordset = TASDK.General.prototype.volumeROC(m_Volume, sd[N8Z], "Result"); else if (S9y4F[r4v](sd[r48], "STD Dev")) recordset = TASDK.General.prototype.standardDeviation(getSourceField(sd), sd[N8Z], parseFloat(sd[q1v]["Standard Deviations"]), getMovingAverageType(sd[q1v]["Moving Average Type"]), "Result"); else if (S9y4F[A7M](sd[r48], "M Flow")) recordset = TASDK.Index.prototype.moneyFlowIndex(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[f7M](sd[r48], "Trade Vol")) recordset = TASDK.Index.prototype.tradeVolumeIndex(getSourceField(sd), m_Volume, parseFloat(sd[q1v]["Min Tick Value"]), "Result"); else if (S9y4F[(u5Z)](sd[r48], (g93 + G7i + A4Z))) recordset = TASDK.Index.prototype.swingIndex(m_Recordset, parseFloat(sd[q1v][(S9y4F.N9y + U1v + S9y4F.t3y + V2v + G5y + B3v + V2v + H7y + B5K + K1y)]), "Result"); else if (S9y4F[v1M](sd[r48], "Acc Swing")) recordset = TASDK.Index.prototype.swingIndex(m_Recordset, parseFloat(sd[q1v]["Limit Move Value"]), "Result"); else if (S9y4F[C3y](sd[(U2Z + k5Z + K1y)], "Price Vol")) recordset = TASDK.Index.prototype.priceVolumeTrend(getSourceField(sd), m_Volume, "Result"); else if (S9y4F[H5K](sd[r48], "Pos Vol")) recordset = TASDK.Index.prototype.positiveVolumeIndex(getSourceField(sd), m_Volume, "Result"); else if (S9y4F[u7K](sd[r48], "Neg Vol")) recordset = TASDK.Index.prototype.negativeVolumeIndex(getSourceField(sd), m_Volume, "Result"); else if (S9y4F[z3Z](sd[r48], "On Bal Vol")) recordset = TASDK.Index.prototype.onBalanceVolume(getSourceField(sd), m_Volume, "Result"); else if (S9y4F[o6M](sd[r48], "Perf Idx")) recordset = TASDK.Index.prototype.performance(getSourceField(sd), "Result"); else if (S9y4F[l6i](sd[r48], "Mass Idx")) recordset = TASDK.Index.prototype.massIndex(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[z4i](sd[r48], "Chaikin MF")) recordset = TASDK.Index.prototype.chaikinMoneyFlow(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[z1K](sd[r48], "CCI")) recordset = TASDK.Index.prototype.commodityChannelIndex(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[c78](sd[r48], "Stch Mtm")) recordset = TASDK.Index.prototype.stochasticMomentumIndex(m_Recordset, parseFloat(sd[q1v]["%K Periods"]), parseFloat(sd[q1v]["%K Smoothing Periods"]), parseFloat(sd[q1v]["%K Double Smoothing Periods"]), parseFloat(sd[q1v]["%D Periods"]), getMovingAverageType(sd[q1v]["Moving Average Type"]), getMovingAverageType(sd[(Z93 + v4Z)]["%D Moving Average Type"])); else if (S9y4F[t78](sd[r48], "Hist Vol")) recordset = TASDK.Index.prototype.historicalVolatility(getSourceField(sd), sd[N8Z], parseFloat(sd[q1v]["Bar History"]), parseFloat(sd[q1v]["Standard Deviations"]), "Result"); else if (S9y4F[s5y](sd[r48], "Chande Mtm")) recordset = TASDK.Oscillator.prototype.chandeMomentumOscillator(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[L5M](sd[r48], "Momentum")) recordset = TASDK.Oscillator.prototype.momentum(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[b4M](sd[r48], "TRIX")) recordset = TASDK.Oscillator.prototype.TRIX(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[(u4y + I0v)](sd[r48], "VT HZ Filter")) recordset = TASDK.Oscillator.prototype.verticalHorizontalFilter(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[p7Z](sd[r48], "Ultimate")) recordset = TASDK.Oscillator.prototype.ultimateOscillator(m_Recordset, parseFloat(sd[(S9y4F.W0Z + a6Z + D4M + S9y4F.t3y + S9y4F.a5Z)][(G2K + q7Z + X5Z + V2v + u6K)]), parseFloat(sd[q1v]["Cycle 2"]), parseFloat(sd[q1v]["Cycle 3"]), "Result"); else if (S9y4F[a7v](sd[r48], "Williams %R")) recordset = TASDK.Oscillator.prototype.williamsPctR(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[i9i](sd[r48], "W Acc Dist")) recordset = TASDK.Oscillator.prototype.williamsAccumulationDistribution(m_Recordset, (L3B + K1y + S9y4F.a5Z + B3y + J6Z + S9y4F.t3y)); else if (S9y4F[(s9v + J6Z)](sd[r48], "Vol Osc")) recordset = TASDK.Oscillator.prototype.volumeOscillator(m_Volume, parseFloat(sd[q1v][(U3B + S9y4F.n0Z + B6Z + K2i + V2v + l3B + W23 + V2v + F6y + I13 + S9y4F.W0Z + B63 + S9y4F.a5Z)]), parseFloat(sd[q1v]["Long Term Periods"]), (S9y4F[w73](sd[q1v]["Points Or Percent"], "Points") ? 1 : 2), "Result"); else if (S9y4F[s4y](sd[r48], "Chaikin Vol")) recordset = TASDK.Oscillator.prototype.chaikinVolatility(m_Recordset, sd[N8Z], parseFloat(sd[q1v]["Rate Of Change"]), getMovingAverageType(sd[q1v]["Moving Average Type"]), "Result"); else if (S9y4F[(U9y + J6Z)](sd[r48], (F6y + g7y + V2v + b5y + S9y4F.a5Z + j1y))) recordset = TASDK.Oscillator.prototype.priceOscillator(getSourceField(sd), parseFloat(sd[(S9y4F.W0Z + I0K)]["Long Cycle"]), parseFloat(sd[q1v][(S4Z + K2i + V2v + G2K + L33)]), getMovingAverageType(sd[q1v][(K3y + Y9K + V2v + S9y4F.E2K + S9y4F.u7Z + I13 + I4y + o53 + V2v + l3B + Q9y)]), (p23 + J6Z + S9y4F.t3y)); else if (S9y4F[d2K](sd[r48], "EOM")) recordset = TASDK.Oscillator.prototype.easeOfMovement(m_Recordset, sd[N8Z], getMovingAverageType(sd[q1v]["Moving Average Type"]), "Result"); else if (S9y4F[M7K](sd[(r48)], "Detrended")) recordset = TASDK.Oscillator.prototype.detrendedPriceOscillator(getSourceField(sd), sd[N8Z], getMovingAverageType(sd[q1v][(G5y + B6Z + d53 + A4Z + V2v + S9y4F.E2K + S9y4F.u7Z + K1y + A0i + A4Z + K1y + V2v + l3B + q7Z + k5Z + K1y)]), "Result"); else if (S9y4F[i9K](sd[r48], "True Range")) recordset = TASDK.Oscillator.prototype.trueRange(m_Recordset, "Result"); else if (S9y4F[K53](sd[r48], "ATR")) { recordset = TASDK.Oscillator.prototype.trueRange(m_Recordset, "TR"); recordset = TASDK.MovingAverage.prototype.simpleMovingAverage(recordset[Q3M]("TR"), sd[N8Z], (N7i + S9y4F.a5Z + o0Z)); }
			else if (S9y4F[N1M](sd[r48], "Aroon Osc")) recordset = TASDK.Oscillator.prototype.aroon(m_Recordset, sd[N8Z]); else if (S9y4F[M2Z](sd[r48], "Fractal Chaos")) recordset = TASDK.Oscillator.prototype.fractalChaosOscillator(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[w78](sd[r48], "Prime Number")) recordset = TASDK.Oscillator.prototype.primeNumberOscillator(m_Close, "Result"); else if (S9y4F[w1K](sd[r48], (d9y + u6y + S9y4F.b3y + V2v + G0y + z9v))) recordset = TASDK.Index.prototype.elderForceIndex(m_Recordset, (N7i + S9y4F.a5Z + B3y + J6Z + S9y4F.t3y)); else if (S9y4F[C1i](sd[(S9y4F.t3y + Q8i + K1y)], "Ehler Fisher")) recordset = TASDK.Oscillator.prototype.ehlerFisherTransform(m_Recordset, sd[N8Z], "EF"); else if (S9y4F[B7Z](sd[r48], "Schaff")) recordset = TASDK.Oscillator.prototype.schaffTrendCycle(getSourceField(sd), sd[N8Z], parseFloat(sd[q1v]["Short Cycle"]), parseFloat(sd[q1v]["Long Cycle"]), getMovingAverageType(sd[q1v]["Moving Average Type"]), "Result"); else if (S9y4F[(d9y + R23)](sd[r48], "QStick")) recordset = TASDK.Index.prototype.qStick(m_Recordset, sd[N8Z], getMovingAverageType(sd[q1v]["Moving Average Type"]), "Result"); else if (S9y4F[M0i](sd[(S9y4F.t3y + Q8i + K1y)], (G2v))) recordset = TASDK.Oscillator.prototype.centerOfGravity(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[K2v](sd[r48], "Coppock")) recordset = TASDK.Oscillator.prototype.coppockCurve(getSourceField(sd), "Result"); else if (S9y4F[P5M](sd[r48], "Chande Fcst")) recordset = TASDK.Oscillator.prototype.chandeForecastOscillator(getSourceField(sd), sd[N8Z], "Result"); else if (S9y4F[g7M](sd[(U2Z + V5M)], "Gopala")) recordset = TASDK.Index.prototype.gopalakrishnanRangeIndex(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[h1Z](sd[r48], "Intraday Mtm")) recordset = TASDK.Index.prototype.intradayMomentumIndex(m_Recordset, (L3B + K1y + i2y + u1v)); else if (S9y4F[Q5K](sd[r48], "Pretty Good")) recordset = TASDK.Oscillator.prototype.prettyGoodOscillator(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[O2i](sd[r48], "RAVI")) recordset = TASDK.Index.prototype.RAVI(getSourceField(sd), parseFloat(sd[q1v]["Short Cycle"]), parseFloat(sd[q1v]["Long Cycle"]), "Result"); else if (S9y4F[Z6v](sd[r48], "Random Walk")) recordset = TASDK.Index.prototype.randomWalkIndex(m_Recordset, sd[N8Z], "Random Walk"); else if (S9y4F[h1i](sd[r48], "Twiggs")) recordset = TASDK.Index.prototype.twiggsMoneyFlow(m_Recordset, sd[N8Z], "Result"); else if (S9y4F[f8M](sd[r48], "Directional")) recordset = TASDK.Oscillator.prototype.directionalMovementSystem(m_Recordset, sd[(V5M + S9y4F.b3y + F8i + u4y)]); else if (S9y4F[l9v](sd[r48], "ADX")) recordset = TASDK.Oscillator.prototype.directionalMovementSystem(m_Recordset, sd[(V5M + S9y4F.b3y + F8i + u4y)]); else if (S9y4F[z3M](sd[r48], "High Low")) recordset = TASDK.Bands.prototype.highLowBands(m_High, m_Low, m_Close, sd[N8Z]); else if (S9y4F[(a5M + J6Z)](sd[r48], "MA Env")) recordset = TASDK.Bands.prototype.movingAverageEnvelope(getSourceField(sd), sd[N8Z], getMovingAverageType(sd[q1v]["Moving Average Type"]), parseFloat(sd[q1v]["Shift Percentage"])); else if (S9y4F[Q4K](sd[r48], "Fractal Chaos Bands")) recordset = TASDK.Bands.prototype.fractalChaosBands(m_Recordset, sd[N8Z]); else if (S9y4F[H0y](sd[r48], "Prime Number Bands")) recordset = TASDK.Bands.prototype.primeNumberBands(m_High, m_Low, sd[N8Z]); else if (S9y4F[g8y](sd[r48], "Bollinger Bands")) recordset = TASDK.Bands.prototype.bollingerBands(getSourceField(sd), sd[N8Z], parseFloat(sd[q1v]["Standard Deviations"]), getMovingAverageType(sd[q1v][(G5y + B6Z + d53 + A4Z + V2v + S9y4F.E2K + S9y4F.u7Z + P1M + K1y + V2v + l3B + Q8i + K1y)])); else if (S9y4F[F3y](sd[(S9y4F.t3y + Q9y)], "Keltner")) recordset = TASDK.Bands.prototype.keltner(m_Recordset, sd[N8Z], parseFloat(sd[q1v]["Shift"]), getMovingAverageType(sd[q1v]["Moving Average Type"]), "Keltner"); else if (S9y4F[b3B](sd[r48], "PSAR")) recordset = TASDK.Oscillator.prototype.parabolicSAR(m_High, m_Low, parseFloat(sd[q1v]["Minimum AF"]), parseFloat(sd[q1v]["Maximum AF"]), "Result"); else if (S9y4F[E53](sd[r48], "Klinger")) recordset = TASDK.Oscillator.prototype.klingerVolumeOscillator(m_Recordset, parseFloat(sd[q1v]["Signal Periods"]), parseFloat(sd[q1v]["Short Cycle"]), parseFloat(sd[q1v]["Long Cycle"]), getMovingAverageType(sd[q1v]["Moving Average Type"]), "Klinger"); else if (S9y4F[w4Z](sd[r48], (d9y + J6Z + d4y + V2v + L3B + D0y))) recordset = TASDK.Oscillator.prototype.elderRay(m_Recordset, sd[N8Z], getMovingAverageType(sd[q1v]["Moving Average Type"]), "Elder"); if (S9y4F[(V5y + J6Z)](recordset, null)) return; var mFields = recordset["_m_FieldNav"]; for (var i = 0; S9y4F[(L43 + J6Z)](i, mFields.length) ; i++) {
				var name = mFields[i][(X7K + Y9Z + K1y)], values = mFields[i]["_m_values"]; for (var j = 1; S9y4F[l5y](j, values.length) ; j++) { if (S9y4F[S3K](j, quotes.length)) break; quotes[S9y4F[O6i](j, 1)][name + " " + sd[s5i]] = values[j]; }
			}
		}
		; STX[N7Z][L93] = function () { this[s5i] = L93; this[w9Z] = []; this[k7Z] = S9y4F.Y3B; this[S9y4F.n0Z] = S9y4F.Y3B; this[e2y] = S9y4F.a3B; this[J78] = Z3y; this[P7y] = S9y4F.o6i; this[I38] = S9y4F.Y3B; }
		; STX[N7Z][L93][s7B](STX[N7Z][m3K]); STX.Drawing.annotation.prototype.measure = function () { }
		; STX.Drawing.annotation.prototype.render = function (context) {
			var k2i = "bet", R2K = "alph", C6v = "w4l", D9y = "atio", A1i = "erCo", n7M = "bor", P6M = "U4l", A4K = "m4l", x4Z = "Q4l", t0M = "N4", X5y = "Z4", I3M = 9823564, p0Z = 1563497, Y6y = 253231586, Z4i = 1847296028, panel = this[(R5i)][(G0M + C6Z + S9y4F.a5Z)][this[z4M]]; var M3h = -Z4i, m3h = Y6y, h3h = S9y4F.V3B; for (var Q3h = S9y4F.K3B; S9y4F.w7h.r7h(Q3h.toString(), Q3h.toString().length, p0Z) !== M3h; Q3h++) { leftDT.setMinutes(S9y4F.W7Q(leftDT.getMinutes(), period)); leftDT.setHours(S9y4F.w7Q(leftDT.getHours(), period)); h3h += S9y4F.V3B; }
			if (S9y4F.w7h.r7h(h3h.toString(), h3h.toString().length, I3M) !== m3h) { this.chart.container.appendChild(this.chart.canvas); this.deleteHighlighted(); context.moveTo(x, y); }
			if (!panel) return; var x0 = this[R5i][x8Z](this[F4K][0], panel[n48]), y0 = this[R5i][F0i](panel, this[F4K][0], this[F4K][1]); this[R5i][l4M]("stx_annotation", context); context.textBaseline = "top"; var x = x0, y = y0, w = this[k7Z], h = this[S9y4F.n0Z], color = this[J2y]; if (S9y4F[(X5y + J6Z)](color, (Y83)) || STX[g58](color)) color = this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][E5K]; if (this[l83]) color = this[R5i][j2M]("stx_highlight_vector"); if (this[H0M]) {
				var sx0, sx1, sy0, sy1; if (this[H0M][u4y]) { sx0 = this[R5i][(k5Z + S9y4F.W0Z + P7Z + b73 + G0y + U8i + Y9Z + l3B + S9y4F.W0Z + b18)](this[(S9y4F.a5Z + V9i)][S9y4F.t3y]); sy0 = this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][F0i](panel, this[H0M][S9y4F.t3y], this[H0M][S9y4F.u7Z]); sx1 = x + S9y4F[(t0M + J6Z)](w, 2); sy1 = y + S9y4F[x4Z](h, 2); }
				else if (this[H0M][P7Z]) { sx0 = x; sy0 = y; x += this[H0M][P7Z]; y += this[H0M][q7Z]; sx1 = x + S9y4F[A4K](w, 2); sy1 = y + S9y4F[P6M](h, 2); }
				context.beginPath(); if (this[V5v]) context.strokeStyle = this[(n7M + e2M + S9y4F.b3y + S9y4F.j88 + u0Z + S9y4F.b3y)]; else context.strokeStyle = color; context.moveTo(sx0, sy0); context.lineTo(sx1, sy1); context.stroke();
			}
			if (this[l83]) { this[R5i][a0y]("stx_annotation_highlight_bg", context); context.fillRect(x, y, w, h); }
			else {
				if (this[r8Z]) { context.fillStyle = this[r8Z]; context.fillRect(x, y, w, h); }
				else if (this[H0M]) { context.fillStyle = this[R5i][p5Z]; context.fillRect(x, y, w, h); }
			}
			if (this[V5v]) { context.beginPath(); context.strokeStyle = this[(Q4y + B6Z + S9y4F.b3y + u4y + A1i + J6Z + c13)]; context.rect(x, y, w, h); context.stroke(); }
			this[R5i][l4M]("stx_annotation"); if (this[l83]) { this[R5i][a0y]((O4y + P7Z + r2y + I4y + a6Z + P4K + S9y4F.t3y + D9y + a6Z + r2y + S9y4F.n0Z + z5K + d03 + X18), context); }
			else { context.fillStyle = color; }
			y += this[e2y]; for (var i = 0; S9y4F[C6v](i, this[w9Z].length) ; i++) { context.fillText(this[w9Z][i], x + this[e2y], y); y += this[I38]; }
			context.textBaseline = (R2K + I4y + k2i + j98);
		}
		; STX.Drawing.annotation.prototype.edit = function (context) {
			var J0i = "setAttribute", o6y = "onkeyup", N3y = "cla", x9M = "H1l", G3Z = "aut", U3v = "value", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; function handleTAMouseUp(stx) {
				return function (e) {
					if (stx[z4Z] && STXChart[G53]) { stx[Y2M](e); }
				}
				;
			}
			; function cancelAnnotation(self) {
				return function () { self[R5i][q5K](); }
				;
			}
			function saveAnnotation(self) {
				return function () { var W4i = "eOccu", N8i = "han"; if (S9y4F[(X6y + Z7K + J6Z)](self[P7y][U3v], "")) return; self[J78] = self[P7y][U3v]; self[w2y](); self[R5i][J1y](self); self[R5i][(j1y + N8i + A4Z + W4i + S9y4F.b3y + S9y4F.b3y + K1y + u4y)]("vector"); self[R5i][q5K](); }
				;
			}
			; function resizeAnnotation(self) {
				return function (e) {
					var C9Z = "lef", a2K = "Y1l", u73 = "q1l", b9Z = "o4l", X4Z = "u4l", a1y = "v4l", k9i = "e4l", q2v = "d4l", C5y = "W4l", b48 = "keyCode"; if (e) {
						var key = (window[Y3K]) ? event[b48] : e[b48]; switch (key) { case 27: self[R5i][(B3y + a6Z + u4y + B6Z)](); return; }
					}
					var stx = self[R5i], ta = self[P7y], save = stx[E0y][F5M], cancel = stx[E0y][q2i], arr = ta[U3v][L9K]('\n'), w = 0; stx[l4M]("stx_annotation"); for (var i = 0; S9y4F[C5y](i, arr.length) ; i++) { var m = stx[n48][U83].measureText(arr[i]).width; if (S9y4F[q2v](m, w)) w = m; }
					h = S9y4F[k9i]((arr.length + 1), (self[(q4Z + B6Z + U0K + y23 + E8Z + K1y)] + 3)); if (S9y4F[a1y](w, 50)) w = 50; ta[q68].width = (w + 30) + (V1M); ta[q68].height = h + "px"; var y = parseInt(STX[i1y](ta.style.top)), x = STX[i1y](ta[q68][K1Z]); w = ta[D2v]; h = ta[M03]; if (S9y4F[X4Z](x + w + 100, self[R5i][n48][e5Z])) { save.style.top = y + "px"; cancel.style.top = y + "px"; save[q68][K1Z] = (x + w + 10) + "px"; cancel[q68][K1Z] = (x + w + 60) + "px"; }
					else if (S9y4F[(b9Z)](y + h + 30, self[R5i][n48][a18])) { save.style.top = (y + h + 10) + "px"; cancel.style.top = (y + h + 10) + "px"; save[q68][K1Z] = x + "px"; cancel[q68][K1Z] = (x + 50) + "px"; }
					else { save.style.top = (S9y4F[u73](y, 35)) + "px"; cancel.style.top = (S9y4F[a2K](y, 35)) + "px"; save[q68][K1Z] = x + "px"; cancel[q68][(C9Z + S9y4F.t3y)] = (x + 50) + "px"; }
				}
				;
			}
			this[R5i][D63](); document[D6i][q68][d0i] = (G3Z + B6Z); this[R5i][G2y] = true; this[R5i][Y4M] = "annotation"; if (S9y4F[x9M](this[P7y], null)) { this[P7y] = document[i68]("TEXTAREA"); this[P7y][(N3y + S9y4F.a5Z + S9y4F.a5Z + D5y + I4y + Y9Z + K1y)] = "stx_annotation"; this[P7y][o6y] = resizeAnnotation(this); this[P7y][v0i] = handleTAMouseUp(this[R5i]); this[(S9y4F.t3y + I4y)][J0i]("wrap", (i2i + u4y)); this[R5i][n48][(j3v + P7y + S9y4F.W0Z + P8K + S9y4F.b3y)][B73](this[P7y]); this[P7y][q68][E63] = "absolute"; this[P7y][q68].width = "100px"; this[P7y][q68].height = "20px"; }
			var x0 = this[R5i][x8Z](this[F4K][0], panel[n48]), y0 = this[R5i][F0i](panel, this[F4K][0], this[F4K][1]); this[(P7y)][q68][K1Z] = x0 + (V1M); this.ta.style.top = y0 + "px"; this[R5i][E0y][F5M][q68][G5v] = "block"; this[R5i][E0y][q2i][q68][G5v] = "block"; this[(O4y + P7Z)][E0y][F5M][B2Z] = saveAnnotation(this); this[R5i][E0y][q2i][B2Z] = cancelAnnotation(this); resizeAnnotation(this)(); STX[U5Z](this[P7y], true);
		}
		; STX.Drawing.annotation.prototype.click = function (context, tick, value) { var C3Z = "edit", panel = this[R5i][w2K][this[z4M]]; this[E8v](); this[F4K] = [tick, value]; this[T0i] = this[R5i][e2K](this[F4K][S9y4F.Y3B], panel[n48]); this[x0Z] = value; this[w2y](); this[C3Z](context); return j8Z; }
		; STX.Drawing.annotation.prototype.intersected = function (tick, value, box) {
			var t8M = "X1l", M3K = "S1l", c1v = "G1l", panel = this[R5i][w2K][this[z4M]], x0 = this[R5i][x8Z](this[F4K][S9y4F.Y3B], panel[(j1y + w9M + S9y4F.b3y + S9y4F.t3y)]), y0 = this[R5i][F0i](panel, this[F4K][S9y4F.Y3B], this[F4K][S9y4F.K3B]), x1 = x0 + this[k7Z], y1 = y0 + this[S9y4F.n0Z]; if (this[H0M] && this[H0M][P7Z]) { x0 += this[H0M][P7Z]; x1 += this[H0M][P7Z]; y0 += this[H0M][q7Z]; y1 += this[H0M][q7Z]; }
			var x = this[R5i][x8Z](tick, panel[n48]), y = this[R5i][F0i](panel, tick, value); if (S9y4F[c1v](x, x0) && S9y4F[M3K](x, x1) && S9y4F[(E8Z + u6K + J6Z)](y, y0) && S9y4F[t8M](y, y1)) return L9i; return j8Z;
		}
		; STX.Drawing.annotation.prototype.abort = function () { var r8M = "fixScreen", o5M = "curso", s0v = "ntr"; this[R5i][(R48 + s0v + B6Z + F2v)][F5M][q68][G5v] = "none"; this[(S9y4F.a5Z + F2Z)][E0y][q2i][q68][(u4y + V2i + y8M + q7Z)] = "none"; if (this[P7y]) this[R5i][n48][(q9M + I4y + G7i + I13)][n9y](this[P7y]); this[P7y] = null; this[R5i][Y4M] = ""; this[(R5i)][m0i](); document[D6i][q68][(o5M + S9y4F.b3y)] = "crosshair"; this[R5i][G2y] = false; STX[x4y](this[R5i][n48][(S9y4F.t3y + K1y + Y9Z + k5Z + G2K + O2M + g5y)], this); STX[r8M](); }
		; STX.Drawing.annotation.prototype.reconstruct = function (stx, obj) { this[R5i] = stx; this[J2y] = obj[t3Z]; this[z4M] = obj[X4K]; this[T0i] = obj[T0i]; this[x0Z] = obj[x0Z]; this[J78] = unescape(obj[(f3y + P7Z + S9y4F.t3y)]); this[H0M] = obj[H0M]; this[V5v] = obj[(Q4y + j1y)]; this[r8Z] = obj[u1i]; this[w2y](); }
		; STX.Drawing.annotation.prototype.serialize = function () {
			var v2i = "bc", obj = { name: this[s5i], pnl: this[z4M], col: this[J2y], d0: this[(u4y + y6K)], v0: this[x0Z], text: escape(this[(S9y4F.t3y + K1y + P7Z + S9y4F.t3y)]) }
			; if (this[H0M]) {
				obj[H0M] = { "d": this[H0M][u4y], "v": this[H0M][S9y4F.u7Z], "x": this[(S9y4F.a5Z + f3y + Y9Z)][P7Z], "y": this[H0M][q7Z] }
				;
			}
			if (this[V5v]) obj[(v2i)] = this[V5v]; if (this[r8Z]) obj[u1i] = this[r8Z]; return obj;
		}
		; STX.Drawing.annotation.prototype.adjust = function () {
			var Q4Z = "ueFro", G1i = "J1l", D28 = "1l", m38 = "T1l", N38 = "ntSize", y2y = "D1l", P9K = "M1l", z7y = "omD", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][(i6Z + j1y + S6i + S9y4F.b3y + z7y + I4y + f3y)](this[(u4y + y6K)], panel[n48]), this[x0Z]]; this[w9Z] = this[J78][L9K]('\n'); var w = 0; this[R5i][(j1y + I4y + a6Z + g7v + S9y4F.a5Z + G0y + S0v)]("stx_annotation"); for (var i = 0; S9y4F[P9K](i, this[w9Z].length) ; i++) { var m = this[R5i][n48][(R48 + U0K + M3v)].measureText(this[w9Z][i]).width; if (S9y4F[y2y](m, w)) w = m; }
			this[(q4Z + B6Z + N38)] = this[R5i][X88]("stx_annotation"); h = S9y4F[m38](this[(I4y + S9y4F.b3y + S9y4F.b3y)].length, this[I38]); if (STX[I5M]) h += 5; this[k7Z] = w + (S9y4F[(d9Z + D28)](this[e2y], 2)); this[S9y4F.n0Z] = h + (S9y4F[G1i](this[e2y], 2)); var x1 = this[R5i][x8Z](this[(k5Z + y6K)][0], panel[n48]) + w, y1 = this[R5i][o4K](this[F4K][1], panel) + h; this[N4K] = [this[R5i][U3y](x1, panel[n48]), this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][(S9y4F.u7Z + o7y + Q4Z + Y9Z + E6K + K1y + J6Z)](y1, panel)]; if (this[H0M]) { if (this[H0M][u4y]) this[H0M][S9y4F.t3y] = this[R5i][x4K](this[(l4i + Y9Z)][u4y], panel[(j1y + S9y4F.n0Z + q5y + S9y4F.t3y)]); }
		}
		; STX[N7Z][K5K] = function () { this[(a6Z + E1v)] = K5K; this[M68] = j8Z; }
		; STX[N7Z][K5K][s7B](STX[N7Z][w5v]); STX.Drawing.line.prototype.calculateOuterSet = function (panel) {
			var f33 = "ectio", t4K = "b1l", K9M = "E1l", X8y = "s1l"; if (S9y4F[X8y](this[F4K][S9y4F.Y3B], this[N4K][S9y4F.Y3B]) || S9y4F[K9M](this[(k5Z + y6K)][S9y4F.K3B], this[N4K][S9y4F.K3B]) || this[R5i][E5Z](this[R5i][v3Z][l2M])) { return; }
			var vector = { x0: this[F4K][S9y4F.Y3B], y0: this[F4K][S9y4F.K3B], x1: this[N4K][S9y4F.Y3B], y1: this[(N4K)][S9y4F.K3B] }
			; if (S9y4F[t4K](vector[b0K], vector[s0K])) {
				vector = { x0: this[N4K][S9y4F.Y3B], y0: this[N4K][S9y4F.K3B], x1: this[F4K][S9y4F.Y3B], y1: this[F4K][S9y4F.K3B] }
				;
			}
			var earlier = S9y4F[(J6Z + u6K + J6Z)](vector[b0K], B2i), later = vector[s0K] + B2i; this[h6y] = STX[L23](vector, earlier); this[E23] = STX[(q7Z + q9i + f3y + S9y4F.b3y + S9y4F.a5Z + f33 + a6Z)](vector, later); this[(u4y + y13)] = this[R5i][e2K](earlier, panel[n48]); this[t68] = this[R5i][e2K](later, panel[n48]);
		}
		; STX.Drawing.line.prototype.click = function (context, tick, value) {
			var L3v = "calculateOuterSet", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[E8v](); if (!this[L58]) { this[F4K] = [tick, value]; this[L58] = L9i; return j8Z; }
			this[N4K] = [tick, value]; this[T0i] = this[R5i][e2K](this[F4K][S9y4F.Y3B], panel[n48]); this[K0i] = this[R5i][e2K](this[N4K][S9y4F.Y3B], panel[n48]); this[x0Z] = this[F4K][S9y4F.K3B]; this[m0Z] = this[N4K][S9y4F.K3B]; this[L3v](panel); this[L58] = j8Z; return L9i;
		}
		; STX.Drawing.line.prototype.reconstruct = function (stx, obj) {
			var k7y = "jus", b13 = "High Low Bands Median", J0Z = ((22, 7.03E2) <= 6.71E2 ? 110 : 93 <= (0x1EC, 0x166) ? (0x1C2, 2654259) : (0x189, 0xF9)), N73 = 8313589, V38 = 922012393, e88 = 1712931026; var U3h = e88, B3h = -V38, D3h = S9y4F.V3B; for (var t3h = S9y4F.K3B; S9y4F.w7h.r7h(t3h.toString(), t3h.toString().length, N73) !== U3h; t3h++) { D3h += S9y4F.V3B; }
			if (S9y4F.w7h.r7h(D3h.toString(), D3h.toString().length, J0Z) !== B3h) { this.quoteFeed.fetch(params, closure(this, params)); b.removeField(b13); }
			this[R5i] = stx; this[J2y] = obj[t3Z]; this[z4M] = obj[X4K]; this[U58] = obj[d28]; this.lineWidth = obj["lw"]; this[(S9y4F.u7Z + y6K)] = obj[x0Z]; this[m0Z] = obj[m0Z]; this[T0i] = obj[T0i]; this[K0i] = obj[K0i]; if (obj[(u4y + y6K + B2K)]) { this[W9i] = obj[W9i]; this[t68] = obj[t68]; this[h6y] = obj[h6y]; this[E23] = obj[E23]; }
			this[(W2y + k7y + S9y4F.t3y)]();
		}
		; STX.Drawing.line.prototype.serialize = function () {
			var obj = { name: this[s5i], pnl: this[z4M], col: this[J2y], ptrn: this[U58], lw: this.lineWidth, d0: this[T0i], d1: this[K0i], v0: this[x0Z], v1: this[m0Z] }
			; if (this[W9i]) { obj[W9i] = this[W9i]; obj[t68] = this[t68]; obj[h6y] = this[h6y]; obj[E23] = this[E23]; }
			return obj;
		}
		; STX.Drawing.line.prototype.adjust = function () {
			var i1v = "erva", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][x4K](this[T0i], panel[n48]), this[(S9y4F.u7Z + y6K)]]; this[N4K] = [this[R5i][x4K](this[K0i], panel[n48]), this[m0Z]]; if (this[R5i][E5Z](this[R5i][v3Z][(G7i + S9y4F.t3y + i1v + J6Z)]) && this[W9i]) { this[F4K] = [this[R5i][x4K](this[W9i], panel[n48]), this[h6y]]; this[N4K] = [this[(O4y + P7Z)][x4K](this[t68], panel[n48]), this[E23]]; }
		}
		; STX[N7Z][h9y] = function () { this[s5i] = h9y; }
		; STX[N7Z][h9y][s7B](STX[N7Z][K5K]); STX.Drawing.ray.prototype.calculateOuterSet = function (panel) {
			var l6M = "j2l", K0y = "K2l", D7i = "V2l", W53 = "R1l"; if (S9y4F[W53](this[F4K][S9y4F.Y3B], this[N4K][S9y4F.Y3B]) || S9y4F[D7i](this[F4K][S9y4F.K3B], this[N4K][S9y4F.K3B]) || this[R5i][E5Z](this[R5i][v3Z][l2M])) { return; }
			var vector = { x0: this[F4K][S9y4F.Y3B], y0: this[F4K][S9y4F.K3B], x1: this[N4K][S9y4F.Y3B], y1: this[N4K][S9y4F.K3B] }
			, endOfRay = vector[(P7Z + u6K)] + B2i; if (S9y4F[K0y](vector[b0K], vector[s0K])) { endOfRay = S9y4F[l6M](vector[s0K], B2i); }
			this[h6y] = this[x0Z]; this[(m0Z + B2K)] = STX[L23](vector, endOfRay); this[(u4y + y13)] = this[T0i]; this[t68] = this[R5i][e2K](endOfRay, panel[n48]);
		}
		; STX.Drawing.ray.prototype.adjust = function () {
			var S1M = "1B", G0v = "FromDa", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][x4K](this[T0i], panel[n48]), this[x0Z]]; this[N4K] = [this[R5i][(i6Z + b18 + G0v + f3y)](this[K0i], panel[n48]), this[m0Z]]; if (this[R5i][E5Z](this[R5i][v3Z][(G7i + S9y4F.t3y + K1y + x98 + J6Z)]) && this[W9i]) { this[F4K] = [this[R5i][x4K](this[T0i], panel[n48]), this[(S9y4F.u7Z + y6K)]]; this[N4K] = [this[R5i][x4K](this[t68], panel[(j1y + S9y4F.n0Z + I4y + K2i)]), this[(S9y4F.u7Z + S1M)]]; }
		}
		; STX[N7Z][A8Z] = function () { this[s5i] = A8Z; this[M68] = j8Z; }
		; STX[N7Z][A8Z][s7B](STX[N7Z][w5v]); STX.Drawing.horizontal.prototype.measure = function () { }
		; STX.Drawing.horizontal.prototype.click = function (context, tick, value) { var Q83 = "ateFrom", panel = this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][w2K][this[z4M]]; if (!panel) return; this[E8v](); this[(S9y4F.u7Z + y6K)] = value; this[T0i] = this[R5i][(u4y + Q83 + h8M + b18)](tick, panel[n48]); this[w2y](); return L9i; }
		; STX.Drawing.horizontal.prototype.reconstruct = function (stx, obj) { this[R5i] = stx; this[J2y] = obj[t3Z]; this[z4M] = obj[X4K]; this[U58] = obj[d28]; this.lineWidth = obj["lw"]; this[x0Z] = obj[x0Z]; this[T0i] = obj[T0i]; this[y0M] = obj[o7y]; this[w2y](); }
		; STX.Drawing.horizontal.prototype.serialize = function () {
			var obj = { name: this[s5i], pnl: this[z4M], col: this[J2y], ptrn: this[U58], lw: this.lineWidth, v0: this[x0Z], d0: this[T0i], al: this[y0M] }
			; return obj;
		}
		; STX.Drawing.horizontal.prototype.adjust = function () { var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][x4K](this[T0i], panel[(j1y + i2i + S9y4F.t3y)]), this[x0Z]]; this[N4K] = [this[R5i][x4K](this[T0i], panel[n48]) + z8M, this[x0Z]]; }
		; STX.Drawing.horizontal.prototype.copyConfig = function () { var E0K = "xisLa", C3M = "eter", t13 = "tVe"; this[(j1y + Y33 + B6Z + S9y4F.b3y)] = STXChart[S48]; this.lineWidth = STXChart[m5K].lineWidth; this[U58] = STXChart[m5K][U58]; this[y0M] = STXChart[(j1y + a9v + d4M + t13 + u08 + B6Z + S9y4F.b3y + F6y + I4y + A0i + Y9Z + C3M + S9y4F.a5Z)][(I4y + E0K + h2i + J6Z)]; }
		; STX[N7Z][z23] = function () { this[s5i] = z23; }
		; STX[N7Z][z23][s7B](STX[N7Z][A8Z]); STX.Drawing.vertical.prototype.measure = function () { }
		; STX.Drawing.vertical.prototype.adjust = function () { var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][x4K](this[T0i], panel[n48]), this[(x0Z)]]; this[N4K] = [this[(O4y + P7Z)][x4K](this[(T0i)], panel[n48]), this[x0Z] + S9y4F.K3B]; }
		; STX[(p0v + m43)][g08] = function () { var Q6v = "tinuo"; this[(j1M + K1y)] = (R48 + a6Z + Q6v + B3y + S9y4F.a5Z); this[M68] = j8Z; }
		; STX[N7Z][g08][s7B](STX[N7Z][w5v]); STX.Drawing.continuous.prototype.click = function (context, tick, value) {
			var f3B = "serialize", F73 = "nfig", g1M = "yCo", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[(R48 + k5Z + g1M + F73)](); if (!this[L58]) { this[F4K] = [tick, value]; this[L58] = L9i; return j8Z; }
			if (this[T0v](tick, value)) { this[R5i][q5K](); return L9i; }
			this[N4K] = [tick, value]; this[T0i] = this[R5i][e2K](this[F4K][S9y4F.Y3B], panel[n48]); this[K0i] = this[R5i][e2K](this[N4K][S9y4F.Y3B], panel[n48]); this[x0Z] = this[F4K][S9y4F.K3B]; this[m0Z] = this[(k5Z + u6K)][S9y4F.K3B]; var Segment = STX[(g9y + E6y + S9y4F.W0Z + a6Z + A4Z)][w5v], segment = new Segment, obj = this[f3B](this[R5i]); segment[(S9y4F.b3y + d1i + G0K + S9y4F.t3y + S9y4F.b3y + f7Z + S9y4F.t3y)](this[R5i], obj); this[(S9y4F.a5Z + F2Z)][J1y](segment); this[(O4y + P7Z)][v4y](l68); this[R5i][(u4M + B9y)](); this[F4K] = [this[N4K][S9y4F.Y3B], this[N4K][S9y4F.K3B]]; return j8Z;
		}
		; STX[N7Z][q3y] = function () { this[s5i] = q3y; this[i4Z] = q83; this[M68] = L9i; }
		; STX[N7Z][q3y][s7B](STX[N7Z][w5v]); STX.Drawing.freeform.prototype.measure = function () { }
		; STX.Drawing.freeform.prototype.intersected = function (tick, value, box) { var v8v = "P2l", l8Z = "A2l", n6y = "F2l", z6Z = "i2l"; if (S9y4F[z6Z](tick, this[f3M]) || S9y4F[n6y](tick, this[o88])) return j8Z; if (S9y4F[l8Z](value, this[p7M]) || S9y4F[v8v](value, this[r88])) return j8Z; return L9i; }
		; STX.Drawing.freeform.prototype.click = function (context, tick, value) {
			var o2M = "wn", d6v = "nDo", P7v = "tempSplineTension", f2Z = "nod", p73 = "B2l", x8y = "t2l", W3K = "resolveX", K5y = "h2l", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; if (S9y4F[K5y](this[L58], j8Z)) { this[E8v](); this[G3M] = Math[(S9y4F.b3y + B6Z + n0v + u4y)](this[(R5i)][W3K](this[R5i][x8Z](tick, panel[n48]))); this[e7M] = Math[E08](this[R5i][g3K](this[R5i][F0i](panel, tick, value))); this[T0i] = this[R5i][e2K](tick, panel[(r28 + p6Z)]); this[x0Z] = value; this[F4K] = [S9y4F[x8y](STXChart[Y93], this[G3M]), S9y4F[p73](STXChart[P93], this[e7M])]; this[(f2Z + K1y + S9y4F.a5Z)] = [this[F4K][S9y4F.Y3B], this[F4K][S9y4F.K3B]]; this[D18] = [this[F4K]]; this[C9i] = this[R5i][v3Z][C9i]; this[S4y] = panel[n5K][S4y]; this[l2M] = this[R5i][v3Z][l2M]; this[y2Z] = this[R5i][v3Z][y2Z]; this[P7v] = this[i4Z]; this[i4Z] = -S9y4F.K3B; this[L58] = L9i; return j8Z; }
			else { this[(V5M + d6v + o2M)] = j8Z; this[i4Z] = this[P7v]; this[w2y](); return L9i; }
		}
		; STX.Drawing.freeform.prototype.move = function (context, tick, value) {
			var c1K = "g2l", X0v = "O2l", g48 = "p2l", b78 = "x2l", E8i = "f2l", W4M = "airY", e5v = "y2l", v0Z = "r2l"; if (!this[L58]) return; this[K0i] = this[R5i][e2K](tick, panel[n48]); this[m0Z] = value; this[N4K] = [S9y4F[v0Z](STXChart[Y93], this[G3M]), S9y4F[e5v](STXChart[(j1y + S63 + W4M)], this[e7M])]; if (S9y4F[E8i](this[D18].length, 2)) {
				if (S9y4F[b78](this[N4K][0], this[D18][this[D18].length - 2][0]) && S9y4F[g48](this[N4K][0], this[D18][this[D18].length - 1][0])) { this[D18].length--; this[B5i].length -= 2; }
				else if (S9y4F[X0v](this[N4K][1], this[D18][this[D18].length - 2][1]) && S9y4F[c1K](this[N4K][1], this[D18][this[D18].length - 1][1])) { this[D18].length--; this[B5i].length -= 2; }
			}
			this[B5i][e8Z](this[N4K][0], this[N4K][1]); this[D18][e8Z](this[N4K]); this[A9i](context); return false;
		}
		; STX.Drawing.freeform.prototype.intervalRatio = function (oldInterval, newInterval, oldPeriodicity, newPeriodicity, startDate, symbol) {
			var d08 = "b8l", p9v = "E8l", k2v = "s8l", M4M = "y8", N9v = "r8l", W8Z = "U8l", x73 = "m8l", d0M = "Q8l", U7B = "N8l", F18 = "Z8l", A0K = "a8l", Q7B = "n8l", o4M = "C8l", z9Z = "L8l", m3v = "c8l"; function weeksInMonth(startDate, symbol) { return S9y4F.G3B; }
			; function daysInWeek(startDate, symbol) { return S9y4F.G3B; }
			; function daysInMonth(startDate, symbol) { return o4Z; }
			; function minPerDay(startDate, symbol) { var j7v = ((1., 126.) < 0xB8 ? (0xA2, 390) : (14.06E2, 2.80E1)); return j7v; }
			; var returnValue = S9y4F.Y3B; if (S9y4F[m3v](oldInterval, newInterval)) returnValue = S9y4F.K3B; else if (!isNaN(oldInterval) && !isNaN(newInterval)) returnValue = S9y4F[z9Z](oldInterval, newInterval); else if (isNaN(oldInterval)) {
				if (S9y4F[o4M](oldInterval, r3M) && S9y4F[Q7B](newInterval, X83)) returnValue = weeksInMonth(startDate, symbol); else if (S9y4F[A0K](oldInterval, X83) && S9y4F[F18](newInterval, D93)) returnValue = daysInWeek(startDate, symbol); else if (S9y4F[U7B](oldInterval, r3M) && S9y4F[d0M](newInterval, D93)) returnValue = daysInMonth(startDate, symbol); else if (!isNaN(newInterval)) { if (S9y4F[x73](oldInterval, r3M)) returnValue = S9y4F[W8Z](daysInMonth(startDate, symbol), minPerDay(startDate, symbol), oldInterval); else if (S9y4F[N9v](oldInterval, X83)) returnValue = S9y4F[(M4M + J6Z)](daysInWeek(startDate, symbol), minPerDay(startDate, symbol), oldInterval); else if (S9y4F[k2v](oldInterval, D93)) returnValue = S9y4F[p9v](minPerDay(startDate, symbol), oldInterval); }
			}
			returnValue *= S9y4F[d08](oldPeriodicity, newPeriodicity); return returnValue;
		}
		; STX.Drawing.freeform.prototype.render = function (context) {
			var K0v = "nnect", o2v = "z7l", o8Z = "S7l", y7Z = "G7l", a6M = "7l", a0M = "K7l", q4v = "ul", f7K = "V7l", v7M = "R8l", E1Z = "l8l", k9y = "lN", panel = this[R5i][w2K][this[(k5Z + I4y + a6Z + K1y + k9y + I4y + Y9Z + K1y)]]; if (!panel) return; var intvl = this[m58](this[l2M], this[R5i][v3Z][l2M], this[y2Z], this[(O4y + P7Z)][v3Z][y2Z], this[T0i], panel[(r28 + I4y + K2i)][e5K]); if (S9y4F[E1Z](intvl, 0)) return; var cwr = S9y4F[v7M](this[R5i][v3Z][C9i], this[C9i]), mlt = S9y4F[f7K](panel[n5K][S4y], this[(Y9Z + q4v + S9y4F.t3y + S9y4F.W0Z + k5Z + J6Z + C58 + S9y4F.b3y)]), spx = this[R5i][o3K](this[(u4y + y6K)], panel[n48]), spy = this[R5i][F0i](panel, this[R5i][x4K](this[T0i], panel[n48]), this[x0Z]), arrPoints = [], color = this[J2y], width = this.lineWidth; if (this[l83]) { color = this[R5i][Q9Z]("stx_highlight_vector"); }
			var parameters = { pattern: this[U58], lineWidth: width }
			; for (var n = 0; S9y4F[a0M](n, this[D18].length) ; n++) { var x0 = S9y4F[(M9Z + a6M)](intvl, cwr, (this[D18][n][0])) + spx, y0 = S9y4F[y7Z](mlt, (this[D18][n][1])) + spy; arrPoints[e8Z](x0, y0); }
			if (S9y4F[o8Z](arrPoints.length, 0)) return; if (S9y4F[o2v](this[i4Z], 0)) { this[R5i][(R48 + K0v + l3B + A33 + g9y + B6Z + v4Z)](arrPoints, color, this[s5i], context, panel, parameters); }
			else { this[R5i][u4i](arrPoints, this[i4Z], color, this[s5i], context, true, parameters); }
		}
		; STX.Drawing.freeform.prototype.adjust = function () {
			var h48 = "iY", g5K = "p7l", s6y = "x7l", Q13 = "W7l", k3M = "il", x1i = "k7", G9Z = "T7l", h0v = "D7l", E83 = "M7l", Z4K = "owY", G48 = "iX", H9v = "X7l", panel = this[(R5i)][w2K][this[z4M]]; if (!panel) return; var p0 = [this[B5i][0], this[B5i][1]]; this[D18] = [p0]; this[o88] = this[B5i][0]; this[f3M] = this[B5i][0]; this[r88] = this[B5i][1]; this[p7M] = this[B5i][1]; for (var n = 2; S9y4F[H9v](n, this[(a6Z + B63 + K1y + S9y4F.a5Z)].length) ; n += 2) { var p1 = [this[B5i][n], this[B5i][n + 1]]; this[D18][e8Z](p1); this[o88] = Math[d5y](this[o88], p1[0]); this[f3M] = Math[L8y](this[(S9y4F.n0Z + G48)], p1[0]); this[r88] = Math[(L8y)](this[(J6Z + Z4K)], p1[1]); this[p7M] = Math[d5y](this[(p7M)], p1[1]); }
			var intvl = this[m58](this[l2M], this[(R5i)][v3Z][l2M], this[y2Z], this[(S9y4F.a5Z + F2Z)][(J6Z + I4y + c8i + B3y + S9y4F.t3y)][y2Z], this[T0i], panel[n48][e5K]); if (S9y4F[E83](intvl, 0)) return; var cwr = S9y4F[h0v](this[R5i][v3Z][C9i], this[C9i]), mlt = S9y4F[G9Z](panel[n5K][S4y], this[S4y]), spx = this[R5i][o3K](this[T0i], panel[n48]), spy = this[R5i][F0i](panel, this[R5i][x4K](this[T0i], panel[n48]), this[x0Z]); this[o88] = this[R5i][U3y](Math[z0Z](S9y4F[(x1i + J6Z)](intvl, cwr, (this[o88]))) + spx, panel[n48]); this[f3M] = this[R5i][U3y](Math[(j1y + K1y + k3M)](S9y4F[Q13](intvl, cwr, (this[f3M]))) + spx, panel[n48]); this[r88] = this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][X5M](Math[z0Z](S9y4F[s6y](mlt, (this[r88]))) + spy, panel); this[p7M] = this[R5i][X5M](Math[S1Z](S9y4F[g5K](mlt, (this[(S9y4F.n0Z + h48)]))) + spy, panel);
		}
		; STX.Drawing.freeform.prototype.serialize = function () {
			var W83 = "toF", G03 = "lie", b2K = "mu"; return { name: this[s5i], pnl: this[z4M], col: this[J2y], ptrn: this[U58], lw: this.lineWidth, cw: Number(this[C9i][f5M](4)), mlt: Number(this[(b2K + J6Z + i6Z + k5Z + G03 + S9y4F.b3y)][(W83 + M1i + a83)](4)), d0: this[(u4y + y6K)], v0: this[(x0Z)], int: this[l2M], pd: this[y2Z], nodes: this[(P4K + e2M + S9y4F.a5Z)] }
			;
		}
		; STX.Drawing.freeform.prototype.reconstruct = function (stx, obj) { var x33 = "pd", v3v = "mlt", V98 = "cw"; this[R5i] = stx; this[J2y] = obj[t3Z]; this[z4M] = obj[X4K]; this[U58] = obj[d28]; this.lineWidth = obj["lw"]; this[C9i] = obj[V98]; this[S4y] = obj[v3v]; this[T0i] = obj[T0i]; this[x0Z] = obj[x0Z]; this[l2M] = obj[M8K]; this[y2Z] = obj[x33]; this[B5i] = obj[B5i]; this[w2y](); }
		; STX[N7Z][k3Z] = function () { this[s5i] = k3Z; this[w9Z] = []; this[D1y] = S9y4F.Y3B; this[G5i] = L9i; }
		; STX[N7Z][k3Z][s7B](STX[(g9y + A0i + p5K + A4Z)][w5v]); STX.Drawing.projection.prototype.render = function (context) {
			var d68 = "c3l", Z7M = "lFromD", K93 = "g7", K8i = "pat", h7i = "O7l", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; if (S9y4F[h7i](this[w9Z].length, 2)) return; var color = this[J2y], hcolor = this[R5i][Q9Z]("stx_highlight_vector"), parameters = { pattern: this[(K8i + S9y4F.t3y + I13 + a6Z)], lineWidth: this.lineWidth }
			, x0 = this[R5i][o3K](this[w9Z][0][0], panel[n48]), y0 = this[R5i][B98](this[w9Z][0][1], panel); for (var i = 1; S9y4F[(K93 + J6Z)](i, this[(I4y + t2i)].length) ; i++) { var x1 = this[R5i][(X8i + K1y + Z7M + I4y + S9y4F.t3y + K1y)](this[w9Z][i][0], panel[n48]), y1 = this[R5i][B98](this[w9Z][i][1], panel), c = color; if (this[l83] && S9y4F[d68](i, this[D1y])) c = hcolor; this[R5i][h0i](x0, x1, y0, y1, c, "segment", context, true, parameters); x0 = x1; y0 = y1; }
		}
		; STX.Drawing.projection.prototype.click = function (context, tick, value) {
			var E68 = "ickFro", h23 = "n3l", k33 = "roll", O3y = "C3l", R0M = "L3l", panel = this[(R5i)][w2K][this[z4M]]; if (!panel) return; this[E8v](); if (S9y4F[R0M](this[w9Z].length, 0)) { var q = this[R5i][n48][B6K][S9y4F[O3y](this[R5i][n48][B6K].length, 1)]; this[w9Z][e8Z]([q[a03], q[Y88]]); this[y7K] = this[R5i][n48][(f7B + k33)]; this[Z7i] = this[(S9y4F.a5Z + F2Z)][(j1y + S9y4F.n0Z + p6Z)][B6K].length; }
			else { if (S9y4F[h23](tick, this[R5i][(S9y4F.t3y + E68 + Y9Z + g9y + H2y)](this[w9Z][this[w9Z].length - 2][0], panel[n48]))) return false; }
			this[w9Z][e8Z]([this[(S9y4F.a5Z + F2Z)][e2K](tick, panel[n48]), value]); return false;
		}
		; STX.Drawing.projection.prototype.move = function (context, tick, value) { var Z03 = "ez", C98 = "a3l", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[E8v](); this[w9Z][S9y4F[C98](this[w9Z].length, 1)] = [this[R5i][e2K](tick, panel[(r28 + p6Z)]), value]; var stx = this[R5i]; stx[j3K](); this[R5i][n48][i2v] = this[(q4Z + S9y4F.b3y + K1y + Z03 + K1y)] + (S9y4F[(Y8y + S9y4F.z6K + J6Z)](this[R5i][n48][B6K].length, this[Z7i])); this[R5i][c2y](); this[A9i](context); }
		; STX.Drawing.projection.prototype.intersected = function (tick, value, box) {
			var i1K = "m3l", b6i = "Q3l", D43 = "N3l", b3v = "elName", panel = this[R5i][(W0i + S68)][this[(G0M + a6Z + b3v)]]; if (!panel) return; for (var i = 1; S9y4F[D43](i, this[w9Z].length) ; i++) {
				var x0 = this[R5i][x4K](this[w9Z][S9y4F[b6i](i, 1)][0], panel[(S9y4F.U9Z + S9y4F.t3y)]), x1 = this[R5i][x4K](this[w9Z][i][0], panel[n48]), y0 = this[w9Z][S9y4F[i1K](i, 1)][1], y1 = this[(w9Z)][i][1], inter = STX[V4v](box[b0K], box[c8M], box[s0K], box[P8M], x0, y0, x1, y1, "segment"); if (inter) { this[D1y] = i; return true; }
			}
			return false;
		}
		; STX.Drawing.projection.prototype.measure = function () {
			var q93 = "e3l", H2K = "d3l", o8y = "W3l", G8v = "I3l", x6K = "w3l", H6Z = "3l", panel = this[R5i][(G0M + a6Z + K1y + J6Z + S9y4F.a5Z)][this[z4M]]; if (!panel) return; if (this[D1y]) { var x0 = this[R5i][x4K](this[w9Z][S9y4F[(t7y + H6Z)](this[D1y], 1)][0], panel[n48]), x1 = this[R5i][x4K](this[w9Z][this[D1y]][0], panel[n48]), y0 = this[w9Z][S9y4F[x6K](this[D1y], 1)][1], y1 = this[w9Z][this[D1y]][1]; this[R5i][M73](y0, y1, x0, x1); }
			else { var x0 = this[R5i][x4K](this[w9Z][S9y4F[G8v](this[w9Z].length, 2)][0], panel[n48]), x1 = this[R5i][x4K](this[w9Z][S9y4F[o8y](this[w9Z].length, 1)][0], panel[n48]), y0 = this[w9Z][S9y4F[H2K](this[w9Z].length, 2)][1], y1 = this[w9Z][S9y4F[q93](this[w9Z].length, 1)][1]; this[R5i][M73](y0, y1, x0, x1); }
		}
		; STX.Drawing.projection.prototype.adjust = function () { }
		; STX.Drawing.projection.prototype.abort = function (force) {
			var j43 = "crol", i7y = "u3l", g6i = "ect", U03 = "ers", c1M = "slice", s2i = "v3l"; function killme(stx, result) { stx[j3K](); stx[c2y](); return result; }
			if (force) { this[w9Z] = []; return killme(this[R5i], false); }
			if (this[l83]) {
				if (S9y4F[s2i](this[D1y], 1)) { this[w9Z] = []; return killme(this[R5i], false); }
				this[w9Z] = this[(I4y + t2i)][c1M](0, this[(M8K + U03 + g6i)]); return killme(this[R5i], true);
			}
			else {
				this[(I4y + S9y4F.b3y + S9y4F.b3y)][s3Z](); if (S9y4F[i7y](this[w9Z].length, 1)) { this[R5i][n48][(S9y4F.a5Z + j43 + J6Z)] = this[y7K]; return killme(this[R5i], false); }
				this[R5i][J1y](this); this[R5i][v4y]((S9y4F.u7Z + W5M + S9y4F.t3y + B6Z + S9y4F.b3y)); return killme(this[(S9y4F.a5Z + S9y4F.t3y + P7Z)], false);
			}
		}
		; STX.Drawing.projection.prototype.reconstruct = function (stx, obj) { this[R5i] = stx; this[J2y] = obj[(j1y + Y33)]; this[z4M] = obj[X4K]; this[U58] = obj[(M0M + S9y4F.b3y + a6Z)]; this.lineWidth = obj["lw"]; this[w9Z] = obj[w9Z]; }
		; STX.Drawing.projection.prototype.serialize = function () {
			return { name: this[s5i], pnl: this[z4M], col: this[J2y], ptrn: this[U58], lw: this.lineWidth, arr: this[w9Z] }
			;
		}
		; STX[N7Z][h03] = function () { this[s5i] = h03; this[M68] = j8Z; }
		; STX[N7Z][h03][s7B](STX[N7Z][(S9y4F.a5Z + V73 + v5v + U0K)]); STX.Drawing.measure.prototype.click = function (context, tick, value) {
			var l0K = "Dow", V4i = "fig", P3M = "yCon"; this[(j1y + S73 + P3M + V4i)](); if (!this[L58]) { this[F4K] = [tick, value]; this[(k5Z + H43 + l0K + a6Z)] = L9i; return j8Z; }
			this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][q5K](); this[L58] = j8Z; return L9i;
		}
		; STX[N7Z][q4M] = function () { this[s5i] = q4M; }
		; STX[(U9i + p5K + A4Z)][q4M][s7B](STX[N7Z][(B2K + I4y + k5y + l3B + k7Z + B6Z + F6y + R33)]); STX.Drawing.ellipse.prototype.render = function (context) {
			var G23 = "etLine", v1K = "J5h", l9i = "k5h", v0K = "T5h", u43 = "D5h", Z7v = "one", N78 = "M5h", t0y = "X5h", t83 = "z5h", r0i = "S5h", w58 = "G5h", c5Z = "H5h", C73 = "Y5h", R7B = "q5h", S9y = "o3l", c0y = "omT", s5K = "mTi", D9i = "ixelF", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; var x0 = this[(R5i)][(k5Z + D9i + S9y4F.b3y + B6Z + s5K + b18)](this[F4K][0], panel[n48]), x1 = this[R5i][(X8i + b73 + f0y + c0y + S9y4F.W0Z + b18)](this[N4K][0], panel[n48]), y0 = this[R5i][F0i](panel, this[F4K][0], this[(F4K)][1]), y1 = this[R5i][F0i](panel, this[(N4K)][0], this[N4K][1]), left = S9y4F[S9y](x0, (x1 - x0)), right = x1, middle = y0, bottom = y1, top = S9y4F[R7B](y0, (y1 - y0)), weight = S9y4F[C73]((bottom - top), 6), lineWidth = this.lineWidth; if (!lineWidth) lineWidth = 1.1; var edgeColor = this[(R48 + J6Z + c13)]; if (S9y4F[c5Z](edgeColor, "auto") || STX[g58](edgeColor)) edgeColor = this[R5i][E5K]; if (this[l83]) { edgeColor = this[R5i][Q9Z]("stx_highlight_vector"); if (S9y4F[w58](lineWidth, .1)) lineWidth = 1.1; }
			var fillColor = this[w6v]; context.beginPath(); context.moveTo(left, middle); context.bezierCurveTo(left, bottom + weight, right, bottom + weight, right, middle); context.bezierCurveTo(right, S9y4F[r0i](top, weight), left, S9y4F[t83](top, weight), left, middle); if (fillColor && !STX[g58](fillColor) && S9y4F[t0y](fillColor, "auto")) { context.fillStyle = fillColor; context.globalAlpha = .2; context.fill(); context.globalAlpha = 1; }
			if (edgeColor && S9y4F[N78](this[U58], (a6Z + Z7v))) {
				context.strokeStyle = edgeColor; context.lineWidth = lineWidth; if (context[B28]) { var lineDashArray = []; if (S9y4F[u43](this[U58], "dotted")) lineDashArray = [lineWidth, lineWidth]; else if (S9y4F[v0K](this[U58], "dashed")) lineDashArray = [S9y4F[l9i](lineWidth, 5), S9y4F[v1K](lineWidth, 5)]; context[(S9y4F.a5Z + G23 + g9y + I4y + t9y)](lineDashArray); context[g7K] = 0; }
				context.stroke();
			}
			context.closePath();
		}
		; STX.Drawing.ellipse.prototype.intersected = function (tick, value) { var E9M = "V6", T2y = "R5h", T28 = "l5h", U1y = "b5h", H4Z = "E5h", S28 = "s5", left = S9y4F[(S28 + S9y4F.n0Z)](this[F4K][S9y4F.Y3B], (this[N4K][S9y4F.Y3B] - this[F4K][S9y4F.Y3B])), right = this[(k5Z + u6K)][S9y4F.Y3B], bottom = this[N4K][S9y4F.K3B], top = S9y4F[H4Z](this[(k5Z + y6K)][S9y4F.K3B], (this[N4K][S9y4F.K3B] - this[F4K][S9y4F.K3B])); if (S9y4F[U1y](tick, Math[L8y](left, right)) || S9y4F[T28](tick, Math[(T3Z + a6Z)](left, right))) return j8Z; if (S9y4F[T2y](value, Math[L8y](top, bottom)) || S9y4F[(E9M + S9y4F.n0Z)](value, Math[d5y](top, bottom))) return j8Z; return L9i; }
		; STX.Drawing.ellipse.prototype.copyConfig = function () { this[J2y] = STXChart[S48]; this[w6v] = STXChart[m5K][w6v]; this.lineWidth = STXChart[m5K].lineWidth; this[U58] = STXChart[m5K][U58]; }
		; STX.Drawing.ellipse.prototype.reconstruct = function (stx, obj) { var N63 = "fc"; this[R5i] = stx; this[J2y] = obj[t3Z]; this[w6v] = obj[N63]; this[z4M] = obj[X4K]; this[U58] = obj[d28]; this.lineWidth = obj["lw"]; this[T0i] = obj[T0i]; this[K0i] = obj[K0i]; this[x0Z] = obj[x0Z]; this[m0Z] = obj[m0Z]; this[w2y](); }
		; STX.Drawing.ellipse.prototype.serialize = function () {
			return { name: this[s5i], pnl: this[z4M], col: this[J2y], fc: this[w6v], ptrn: this[U58], lw: this.lineWidth, d0: this[T0i], d1: this[K0i], v0: this[x0Z], v1: this[m0Z] }
			;
		}
		; STX[N7Z][k2Z] = function () { var N7y = "cci", u6Z = "bona"; this[s5i] = (q4Z + S9y4F.W0Z + u6Z + N7y); }
		; STX[(g9y + A0i + k7Z + S9y4F.W0Z + Y9K)][k2Z][s7B](STX[N7Z][(B2K + y2K + k7Z + z4K + M83 + U0K)]); STX[N7Z][k2Z][p6M] = { "trend": S9y4F.t3y, "color": j1y, "parameters": k5Z, "pattern": M0M, "opacity": B6Z, "lineWidth": (b4v), "level": J6Z, "extendLeft": K1y, "printLevels": U8M }
		; STX.Drawing.fibonacci.prototype.copyConfig = function () { this[J2y] = STXChart[S48]; this.lineWidth = STXChart[m5K].lineWidth; this[w6K] = STXChart[m5K][k2Z]; }
		; STX.Drawing.fibonacci.prototype.setOuter = function () {
			var y0K = "B6h", w63 = "t6h", O78 = "lev", t43 = "h6h", G88 = "P6h", m8i = "A6h", v9M = "F6h", P9v = "6h", T5Z = "j6h", a6v = "K6h"; this[B6i] = { p0: STX[H2M](this[F4K]), p1: STX[H2M](this[N4K]) }
			; var y0 = this[(k5Z + y6K)][1], y1 = this[N4K][1], x0 = this[F4K][0], x1 = this[N4K][0], top = Math[d5y](y1, y0), bottom = Math[(i8v + P7Z)](y1, y0), height = S9y4F[a6v](bottom, top), isUpTrend = S9y4F[T5Z]((y1 - y0) / (x1 - x0), 0), min = 0, max = 1; for (var i = 0; S9y4F[(S9y4F.W0Z + P9v)](i, this[w6K][t2K].length) ; i++) {
				var fib = this[w6K][(q4Z + S9y4F.W0Z + Q4y + S9y4F.a5Z)][i]; if (S9y4F[v9M](fib[A98], min) && S9y4F[m8i](fib[A98], max)) continue; var val = isUpTrend ? S9y4F[G88](bottom, height * fib[A98]) : top + S9y4F[t43](height, fib[(O78 + K1y + J6Z)]), x = STX[N0y]({ x0: x0, x1: x1, y0: y0, y1: y1 }
				, val); if (S9y4F[w63](fib[A98], min)) { min = fib[A98]; isUpTrend ? (this[B6i][F4K][1] = val) : (this[B6i][N4K][1] = val); isUpTrend ? (this[B6i][F4K][0] = x) : (this[B6i][N4K][0] = x); }
				else if (S9y4F[y0K](fib[A98], max)) { max = fib[A98]; isUpTrend ? (this[B6i][N4K][1] = val) : (this[B6i][F4K][1] = val); isUpTrend ? (this[B6i][N4K][0] = x) : (this[B6i][(k5Z + y6K)][0] = x); }
			}
		}
		; STX.Drawing.fibonacci.prototype.click = function (context, tick, value) {
			var panel = this[R5i][w2K][this[(W0i + b73 + D5y + I4y + Y9Z + K1y)]]; if (!panel) return; this[E8v](); if (!this[L58]) { this[F4K] = [tick, value]; this[(x0Z)] = value; this[L58] = L9i; return j8Z; }
			if (this[T0v](tick, value)) return this[M68]; this[N4K] = [tick, value]; this[m0Z] = value; this[T0i] = this[R5i][e2K](this[(F4K)][S9y4F.Y3B], panel[n48]); this[K0i] = this[R5i][e2K](this[N4K][S9y4F.Y3B], panel[n48]); this[b4y](); this[w6K] = STX[H2M](this[w6K]); this[L58] = j8Z; return L9i;
		}
		; STX.Drawing.fibonacci.prototype.render = function (context) {
			var j53 = "amet", M0v = "seg", a2y = "a9h", Y4Z = "n9h", c83 = "C9h", r0y = "L9h", p8M = "extendLeft", N4v = "c9h", y3B = "printLevels", s28 = "g6h", R7Z = "O6h", b5v = "p6h", w53 = "fa", S9Z = "x6h", I6Z = "hli", F8K = "f6h", v8y = "trend", G2M = "y6h", i63 = "r6h", O8M = "dj", x2v = "lu", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; if (!this[N4K]) return; var x0 = this[R5i][x8Z](this[F4K][0], panel[n48]), x1 = this[R5i][x8Z](this[N4K][0], panel[n48]), y0 = this[R5i][(j6M + P7Z + O23 + U8i + Y9Z + H7y + I4y + x2v + T3M + O8M + f6v + f3y + u4y)](panel, this[F4K][0], this[F4K][1]), y1 = this[R5i][F0i](panel, this[N4K][0], this[N4K][1]), top = Math[d5y](y1, y0), bottom = Math[L8y](y1, y0), height = S9y4F[i63](bottom, top), isUpTrend = S9y4F[G2M]((y1 - y0) / (x1 - x0), 0), trendLineColor = this[w6K][v8y][(j1y + B6Z + P28)]; if (S9y4F[F8K](trendLineColor, "auto") || STX[g58](trendLineColor)) trendLineColor = this[R5i][E5K]; if (this[(S9y4F.n0Z + S9y4F.W0Z + A4Z + I6Z + h63 + S9y4F.t3y + a83)]) { trendLineColor = this[R5i][Q9Z]("stx_highlight_vector"); }
			context.textBaseline = "middle"; var w = context.measureText("161.8%").width, minX = 2000000000, minY = 2000000000, maxX = -2000000000, maxY = -2000000000, txtColor = this[J2y]; if (S9y4F[S9Z](txtColor, "auto") || STX[g58](txtColor)) txtColor = this[R5i][(u4y + K1y + w53 + o0Z + S9y4F.j88 + J6Z + c13)]; context.fillStyle = txtColor; for (var i = 0; S9y4F[b5v](i, this[w6K][t2K].length) ; i++) {
				var fib = this[w6K][t2K][i], y = isUpTrend ? S9y4F[R7Z](bottom, height * fib[A98]) : top + S9y4F[s28](height, fib[A98]); y = Math[E08](y); var x = STX[N0y]({ x0: x0, x1: x1, y0: y0, y1: y1 }
				, y), farX = this[(S9y4F.a5Z + S9y4F.t3y + P7Z)][(j1y + S9y4F.n0Z + I4y + K2i)].width; if (this[w6K][y3B]) { var txt = (S9y4F[N4v](fib[A98], 100)) + "%"; farX -= w; context.fillText(txt, farX, y); farX -= 5; }
				var nearX = this[w6K][p8M] ? 0 : x, fibColor = fib[J2y]; if (S9y4F[r0y](fibColor, "auto") || STX[g58](fibColor)) fibColor = this[J2y]; if (S9y4F[c83](fibColor, "auto") || STX[g58](fibColor)) fibColor = this[R5i][E5K]; this[R5i][h0i](nearX, farX, y, y, fibColor, "segment", context, panel, fib[w6K]); if (S9y4F[Y4Z](y, minY)) { minX = x; minY = y; }
				if (S9y4F[a2y](y, maxY)) { maxX = x; maxY = y; }
			}
			this[R5i][h0i](minX, maxX, minY, maxY, trendLineColor, (M0v + Y9Z + K1y + U0K), context, panel, this[w6K][v8y][(k5Z + I4y + S9y4F.b3y + j53 + K1y + S9y4F.b3y + S9y4F.a5Z)]);
		}
		; STX.Drawing.fibonacci.prototype.intersected = function (tick, value, box) { return STX[V4v](box[b0K], box[c8M], box[(s0K)], box[P8M], this[B6i][F4K][S9y4F.Y3B], this[B6i][F4K][S9y4F.K3B], this[B6i][N4K][S9y4F.Y3B], this[B6i][N4K][S9y4F.K3B], w5v); }
		; STX.Drawing.fibonacci.prototype.reconstruct = function (stx, obj) { var m18 = "ci", F93 = "ibo", o0i = "pin", I33 = "reverseObject"; obj = STX[z5v](obj, STX[I33](STX[N7Z][k2Z][(Y9Z + I4y + k5Z + o0i + A4Z)])); this[R5i] = stx; this[w6K] = obj[w6K]; if (!this[w6K]) this[w6K] = STX[H2M](STXChart[m5K][(q4Z + F93 + X7K + j1y + m18)]); this[J2y] = obj[t3Z]; this[z4M] = obj[X4K]; this[T0i] = obj[(T0i)]; this[K0i] = obj[(K0i)]; this[x0Z] = obj[x0Z]; this[m0Z] = obj[m0Z]; this[w2y](); }
		; STX.Drawing.fibonacci.prototype.adjust = function () { var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][x4K](this[T0i], panel[(r28 + q5y + S9y4F.t3y)]), this[x0Z]]; this[N4K] = [this[R5i][x4K](this[K0i], panel[n48]), this[m0Z]]; this[b4y](); }
		; STX.Drawing.fibonacci.prototype.serialize = function () {
			var obj = { name: this[s5i], parameters: this[w6K], pnl: this[z4M], col: this[(j1y + B6Z + J6Z + c13)], d0: this[T0i], d1: this[(u4y + u6K)], v0: this[x0Z], v1: this[m0Z] }
			; return STX[z5v](obj, STX[N7Z][k2Z][p6M]);
		}
		; STX[N7Z][j4i] = function () { this[s5i] = j4i; this[c6Z] = []; this[a9y] = j8Z; this[G5i] = L9i; }
		; STX[N7Z][j4i][s7B](STX[N7Z][m3K]); STX.Drawing.bellcurve.prototype.click = function (context, tick, value) {
			var e1y = "nDown", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[E8v](); if (!this[(V5M + e1y)]) { this[F4K] = [tick, value]; this[(V5M + a6Z + g9y + B6Z + k7Z + a6Z)] = L9i; return j8Z; }
			if (this[T0v](tick, value)) return this[M68]; this[N4K] = [tick, value]; this[T0i] = this[R5i][e2K](this[F4K][S9y4F.Y3B], panel[(j1y + S9y4F.n0Z + I4y + S9y4F.b3y + S9y4F.t3y)]); this[K0i] = this[R5i][e2K](this[N4K][S9y4F.Y3B], panel[n48]); this[a9y] = L9i; this[L58] = j8Z; return L9i;
		}
		; STX.Drawing.bellcurve.prototype.profileRange = function (profile, x, right) {
			var S8v = "u9h", o8M = "v9h", b5K = "e9h", h08 = "d9h", X78 = "W9h", V3y = "I9h", V8M = "w9h", p3B = "U9h", u1M = "m9h", H9M = "Q9h", d6Z = "N9h", I1M = "Z9h"; if (S9y4F[(I1M)](x, profile.length)) { profile[x] = []; profile[x][0] = right; return; }
			for (var y = 0, l = profile[x].length; S9y4F[d6Z](y, l) ; y++) {
				var left = profile[x][y]; if (S9y4F[H9M](left[P5y], right[P5y]) && S9y4F[u1M](left[a3v], right[a3v])) { this[x53](profile, x + 1, right); return; }
				else if (S9y4F[p3B](right[P5y], left[P5y]) && S9y4F[V8M](right[a3v], left[P5y]) && S9y4F[V3y](right[a3v], left[a3v])) {
					this[x53](profile, x + 1, { "High": left[P5y], "Low": right[a3v] }
					); right = { "High": right[P5y], "Low": left[P5y] }
					;
				}
				else if (S9y4F[X78](right[a3v], left[a3v]) && S9y4F[h08](right[P5y], left[a3v]) && S9y4F[b5K](right[P5y], left[P5y])) {
					this[x53](profile, x + 1, { "High": right[P5y], "Low": left[a3v] }
					); right = { "High": left[a3v], "Low": right[a3v] }
					;
				}
				else if (S9y4F[o8M](left[P5y], right[P5y]) && S9y4F[S8v](left[a3v], right[a3v])) {
					this[x53](profile, x, { "High": left[a3v], "Low": right[a3v] }
					); this[x53](profile, x + 1, { "High": left[P5y], "Low": left[a3v] }
					); right = { "High": right[P5y], "Low": left[P5y] }
					;
				}
			}
			profile[x][y] = right;
		}
		; STX.Drawing.bellcurve.prototype.render = function (context) {
			var u9v = "k0h", b0y = "T0h", d1Z = "D0h", b6v = "M0h", O98 = "idt", g0y = "ndle", n3B = "tC", s08 = "faul", A5y = "timer"; function calculateProfile(self, panel) {
				return function () {
					var Y3M = "rofile", o0K = "z0h", P4y = "Y0h", M8v = "q0h", X7M = "o9h"; self[c6Z] = []; var sorted = [], tick0 = Math[(T3Z + a6Z)](self[F4K][0], self[N4K][0]), tick1 = Math[L8y](self[F4K][0], self[N4K][0]); if (S9y4F[X7M](tick1 - tick0, 3000)) return; for (var i = tick0; S9y4F[M8v](i, tick1) ; i++) {
						if (S9y4F[P4y](i, 0) || S9y4F[(V4y + y6K + S9y4F.n0Z)](i, panel[n48][B6K].length)) continue; var prices = panel[n48][B6K][i]; sorted[(k5Z + B3y + t9y)]({ "High": prices[P5y], "Low": prices[a3v] }
						);
					}
					function sortFunc(a, b) { var O1v = "S0h", O4Z = "G0h"; if (S9y4F[O4Z](a[a3v], b[a3v])) return -1; if (S9y4F[O1v](a[a3v], b[a3v])) return 1; return 0; }
					sorted[e3y](sortFunc); for (var i = 0; S9y4F[o0K](i, sorted.length) ; i++) { self[x53](self[(k5Z + Y3M)], 0, sorted[i]); }
				}
				;
			}
			if (!this[N4K]) return; var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[b0K] = this[R5i][x8Z](this[F4K][0], panel[n48]); this[s0K] = this[R5i][x8Z](this[N4K][0], panel[n48]); if (S9y4F[(e7y + y6K + S9y4F.n0Z)](this[c6Z].length, 0) || !this[a9y]) { if (this[A5y]) clearTimeout(this[A5y]); this[A5y] = setTimeout(calculateProfile(this, panel), 20); }
			if (this[l83]) { context.fillStyle = this[R5i][Q9Z]("stx_highlight_vector"); context.globalAlpha = .5; }
			else { context.fillStyle = this[J2y]; if (STX[g58](context.fillStyle)) context.fillStyle = this[R5i][(e2M + s08 + n3B + Y33 + B6Z + S9y4F.b3y)]; context.globalAlpha = .5; }
			var cw = this[R5i][v3Z][(z88 + g0y + Y3y + O98 + S9y4F.n0Z)]; context.beginPath(); for (var x = 0; S9y4F[b6v](x, this[c6Z].length) ; x++) {
				for (var y = 0; S9y4F[d1Z](y, this[c6Z][x].length) ; y++) { var range = this[c6Z][x][y], y0 = this[R5i][o4K](range[P5y], panel), y1 = this[R5i][o4K](range[a3v], panel), x0 = Math[d5y](this[b0K], this[s0K]) + S9y4F[b0y](x, cw), x1 = x0 + Math[E08](S9y4F[u9v](cw, .75)); context.moveTo(x0, y0); context.lineTo(x1, y0); context.lineTo(x1, y1); context.lineTo(x0, y1); context.lineTo(x0, y0); }
			}
			context.fill(); context.closePath(); context.globalAlpha = 1;
		}
		; STX.Drawing.bellcurve.prototype.intersected = function (tick, value, box) { var x7K = "s0h", B18 = "J0h"; if (S9y4F[B18](tick, Math[L8y](this[F4K][S9y4F.Y3B], this[(k5Z + u6K)][S9y4F.Y3B])) && S9y4F[x7K](tick, Math[d5y](this[F4K][S9y4F.Y3B], this[N4K][S9y4F.Y3B]))) return L9i; return j8Z; }
		; STX.Drawing.bellcurve.prototype.copyConfig = function () { this[(R48 + P28)] = STXChart[S48]; }
		; STX.Drawing.bellcurve.prototype.adjust = function () { var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[F4K] = [this[R5i][x4K](this[T0i], panel[n48]), S9y4F.Y3B]; this[N4K] = [this[(R5i)][x4K](this[K0i], panel[n48]), S9y4F.Y3B]; }
		; STX.Drawing.bellcurve.prototype.reconstruct = function (stx, obj) { this[R5i] = stx; this[(t3Z + c13)] = obj[t3Z]; this[z4M] = obj[X4K]; this[T0i] = obj[(T0i)]; this[K0i] = obj[K0i]; this[w2y](); this[a9y] = L9i; }
		; STX.Drawing.bellcurve.prototype.serialize = function () {
			return { name: this[(a6Z + C3B + K1y)], pnl: this[z4M], col: this[J2y], d0: this[T0i], d1: this[K0i] }
			;
		}
		; STX[(q1M + E7y + S9y4F.a5Z + h73)] = function () { }
		; V1F(j8Z); STX[t5K][V6v] = function (stx, chart, price) { var a1K = "E0h"; return S9y4F[a1K](Math[E08](((price - STX[t5K][w8i]) / STX[t5K][w8i] * z8M) * G8Z), G8Z); }
		; STX[t5K][F7i] = function (stx, chart, percent) { var I63 = "b0h"; return S9y4F[I63](STX[t5K][w8i], (S9y4F.K3B + (percent / z8M))); }
		; STX[t5K][C23] = function (lhs, rhs) { var s6M = "l0h"; return S9y4F[s6M](lhs, rhs); }
		; STX[t5K][(j1y + S9i + w5y + K1y + f1y + x48 + u9y + M58 + a53 + S9y4F.t3y + X6y + a6Z + a6Z + I13)] = function (stx, chart) {
			var p48 = "n1h", y8i = "C1h", P03 = "L1h", Q03 = "c1h", H13 = "g4h", D7B = "O4h", y73 = "p4h", f73 = "x4h", n3K = "y4h", W98 = "r4h", L9y = "4h", I2v = "t4h", Y48 = "h4h", q4y = "dataSe", g1y = "P4h", g3Z = "A4h", Q5i = "F4h", N0K = "i4h", w5i = "j4h", y5y = "K4h", Y18 = "V4h", U38 = "R0h"; if (!chart[w0v]) return false; var fields = []; for (var field in chart[B9i]) {
				if (chart[B9i][field][w6K][w0v]) { fields[e8Z](field); }
			}
			var priceFields = ["Close", "Open", "High", "Low"]; chart[q3B] = []; var firstQuote = null, firstTick = S9y4F[U38](chart[B6K].length, chart[i2v]), lastTick = firstTick + chart[H58], stopPointer = 0, stops = []; for (var i = 0; S9y4F[Y18](i, stx[L8M].length) ; i++) { var drawing = stx[L8M][i]; if (S9y4F[y5y](drawing[s5i], "comparison_stop")) if (S9y4F[w5i](drawing[x68], firstTick) && S9y4F[N0K](drawing[x68], lastTick)) stops[e8Z](drawing[(S9y4F.t3y + S9y4F.W0Z + j1y + d9Z)]); }
			stops[(u9y + S9y4F.b3y + S9y4F.t3y)](STX[t5K][C23]); for (var i = 0; S9y4F[Q5i](i, chart[H58]) ; i++) {
				position = firstTick + i; if (S9y4F[g3Z](position, chart[B6K].length) && S9y4F[g1y](position, 0)) {
					var quote = chart[(q4y + S9y4F.t3y)][position]; if (!firstQuote) { firstQuote = STX[H2M](quote); }
					if (!quote.transform) quote.transform = {
						"cache": {}
					}
					; STX[t5K][w8i] = firstQuote[Y88]; for (var j = 0; S9y4F[Y48](j, priceFields.length) ; j++) { var field = priceFields[j]; if (quote[field] || S9y4F[I2v](quote[field], 0)) quote.transform[field] = S9y4F[(B2K + L9y)](Math[E08](((quote[field] - STX[t5K][(Q4y + I4y + S9y4F.a5Z + b73 + F9v)]) / STX[t5K][w8i] * 100) * 10000), 10000); }
					var createAStop = false; if (stops && S9y4F[W98](stopPointer, stops.length)) {
						if (S9y4F[n3K](position, stops[stopPointer])) { createAStop = true; stopPointer++; }
					}
					var mouseStop = null; if (stx[g23] && S9y4F[(q4Z + L9y)](stx[g23][s5i], "comparison_stop")) { mouseStop = stx[g23][x68]; }
					if (createAStop || S9y4F[f73](position, mouseStop)) {
						for (var j = 0; S9y4F[y73](j, fields.length) ; j++) { var field = fields[j], current = quote[field]; firstQuote[field] = S9y4F[D7B](current, (1 + (quote.transform[Y88] / 100))); }
					}
					for (var j = 0; S9y4F[H13](j, fields.length) ; j++) {
						var field = fields[j], current = quote[field]; if (current || S9y4F[Q03](current, 0)) {
							var baseline = firstQuote[field]; if (!baseline && S9y4F[P03](baseline, 0)) { firstQuote[field] = baseline = S9y4F[y8i](current, (1 + (quote.transform[Y88] / 100))); }
							quote.transform[field] = S9y4F[p48](Math[E08](((current - baseline) / baseline * 100) * 10000), 10000);
						}
					}
					chart[q3B][e8Z](quote);
				}
				else if (S9y4F[(I4y + b88)](position, 0)) { chart[q3B][e8Z](null); }
			}
			stx[t9K](); return true;
		}
		; STX[t5K][(u98 + v58 + G2K + B6Z + Y9Z + c1i + x38 + M58 + v5v + U0K)] = function () {
			var o7K = "createComparisonSegmentInner"; for (var chartName in this[M18]) { var chart = this[M18][chartName]; if (chart[w0v]) STX[t5K][o7K](this, chart); }
		}
		; STX[t5K][Z1K] = function (stx, panel, price) {
			var G08 = "ring", S53 = "At", q6M = "q2h", H18 = "o1h", Q7M = "v1h", x5v = "e1h", i0K = "xed", I7v = "oFi", Z9M = "d1h", h3v = "W1h", R28 = "percent3", o83 = ((98, 0x8A) >= 0x6E ? (0xF3, .001) : (114., 0x37) < 2.40E1 ? (0x241, 6) : (54.80E1, 0x53)), F7y = "I1h", q6K = "w1h", f1v = "rnat", A2Z = "m1h", o9M = "Q1h", W0v = "N1h", f13 = "Z1h"; if (!price || typeof price == C53) return Z3y; var priceTick = panel[(q7Z + U2v)][C1v]; if (stx[p4M]) { if (S9y4F[f13](priceTick, S9y4F.K3B)) price = stx[p4M][H28][i88](S9y4F[W0v](price, z8M)); else if (S9y4F[o9M](priceTick, M0Z)) price = stx[p4M][U28][i88](S9y4F[A2Z](price, z8M)); else if (S9y4F[(t7y + b88)](priceTick, o58)) price = stx[(S9y4F.W0Z + g5M + f1v + S9y4F.W0Z + h73 + o7y + S9y4F.W0Z + E8Z + K1y + S9y4F.b3y)][E28][i88](S9y4F[q6K](price, z8M)); else if (S9y4F[F7y](priceTick, o83)) price = stx[p4M][R28][i88](S9y4F[h3v](price, z8M)); else price = stx[p4M][N88][i88](price); }
			else { if (S9y4F[Z9M](priceTick, S9y4F.K3B)) price = price[(S9y4F.t3y + I7v + i0K)](S9y4F.Y3B) + D0K; else if (S9y4F[x5v](priceTick, M0Z)) price = price[f5M](S9y4F.K3B) + D0K; else if (S9y4F[Q7M](priceTick, o58)) price = price[f5M](S9y4F.V3B) + D0K; else if (S9y4F[(B3y + b88)](priceTick, o83)) price = price[f5M](S9y4F.o7B) + D0K; else price = price[f5M](S9y4F.a3B) + D0K; }
			if (S9y4F[H18](parseFloat(price), S9y4F.Y3B) && S9y4F[q6M](price[(r28 + q5y + S53)](S9y4F.Y3B), r5K)) { price = price[(i2y + Q4y + O4y + G08)](S9y4F.K3B); }
			return price;
		}
		; STXChart.prototype.setComparison = function (stx, chart, onOff) {
			var A3K = "unsetTransform", A4v = "mp"; if (!chart[w0v] && onOff) { stx.setTransform(chart, STX[t5K][V6v], STX[t5K][F7i]); chart[v73][n5K][o73] = STX[(S9y4F.j88 + A4v + x48 + S9y4F.a5Z + B6Z + a6Z)][Z1K]; chart[v73][(q7Z + U2v)][k43] = q3B; }
			else if (chart[w0v] && !onOff) { stx[A3K](chart); chart[v73][n5K][o73] = S9y4F.o6i; chart[v73][n5K][k43] = B6K; }
			chart[w0v] = onOff;
		}
		; STX[t5K][Y78] = function () { var y2i = "createComparisonSegment"; STXChart.prototype.prepend(m4i, STX[t5K][y2i]); }
		; STX[N7Z][l8M] = function () { this[(a6Z + I4y + Y9Z + K1y)] = l8M; this[v73] = S9y4F.o6i; }
		; STX[N7Z][(j1y + E73 + k5Z + q5y + x38 + V3K + O4y + B6Z + k5Z)][s7B](STX[N7Z]); STX.Drawing.comparison_stop.prototype.adjust = function () { var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; this[x68] = this[R5i][x4K](this[T0i], panel[n48]); }
		; STX.Drawing.comparison_stop.prototype.move = function (context, tick, value) { this[x68] = tick; STX[t5K][B5v] = L9i; this[R5i][c2y](); }
		; STX.Drawing.comparison_stop.prototype.render = function (context) {
			var W8i = "2h", e1K = "_ve", m6M = "x_", panel = this[R5i][w2K][this[z4M]]; if (!panel) return; var chart = panel[n48]; if (!chart[w0v]) return; var yAxis = panel[(N9M + P7Z + V2i)], stx = this[R5i], x = Math[(S9y4F.b3y + B6Z + B3y + a6Z + u4y)](stx[x8Z](this[x68], chart)) + N0Z, color = stx[E5K]; if (this[(S9y4F.n0Z + s58 + S9y4F.n0Z + d03 + M8M)]) { color = stx[Q9Z]((O4y + m6M + S9y4F.n0Z + S9y4F.W0Z + h63 + s5Z + A4Z + S9y4F.n0Z + S9y4F.t3y + e1K + u08 + B6Z + S9y4F.b3y)); }
			stx[n48][U83][f4Z](x, panel.top + yAxis[W88], x, S9y4F[(Q8y + W8i)](panel[C2Z], yAxis[v9Z]), color, S9y4F.K3B, N0Z, [W1Z, W1Z]);
		}
		; STX.Drawing.comparison_stop.prototype.abort = function () { }
		; STX.Drawing.comparison_stop.prototype.intersected = function (tick, value, box) { var G9K = "G2h", R8v = "H2h"; if (S9y4F[R8v](this[x68], box[b0K]) && S9y4F[G9K](this[x68], box[s0K])) return L9i; return j8Z; }
		; STX.Drawing.comparison_stop.prototype.highlight = function (highlighted) {
			var c93 = "S2h"; if (S9y4F[c93](this[(y5M + h63 + s5Z + A4Z + M8M)], highlighted)) { this[l83] = highlighted; return L9i; }
			return j8Z;
		}
		; STX.Drawing.comparison_stop.prototype.click = function (context, tick, value) {
			var panel = this[R5i][w2K][this[z4M]]; if (!panel) return; if (STX[t5K][B5v]) { this[(x68)] = tick; this[T0i] = this[R5i][e2K](this[x68], panel[n48]); }
			else { return j8Z; }
			var stx = this[R5i]; setTimeout(function () { STX[N7Z][l8M][Q0i](stx); }
			, S9y4F.Y3B); return L9i;
		}
		; STX[N7Z][l8M][z8K] = function (stx, chart) { var S0y = "changeVectorType"; STX[t5K][m7M] = STXChart[m7M]; STX[t5K][B5v] = j8Z; stx[S0y](l8M); stx[o13](chart[v73], S9y4F.Y3B, S9y4F.Y3B); }
		; STX[N7Z][l8M][(I9v + S9y4F.b3y)] = function (stx, chart) {
			var P4i = "D2h", b6y = "M2h", V88 = "X2h", W5Z = "z2h"; if (stx[g23] && S9y4F[W5Z](stx[g23][s5i], "comparison_stop")) { STX[N7Z][l8M][(S9y4F.a5Z + D3M)](stx); }
			var panel = chart[(W0i + K1y + J6Z)], i = 0; while (S9y4F[V88](i, stx[L8M].length)) {
				var drawing = stx[L8M][i]; if (S9y4F[b6y](drawing[s5i], "comparison_stop") && S9y4F[P4i](drawing[v73], panel)) { drawing.abort(true); stx[m6K](); stx[L8M][j7Z](i, 1); continue; }
				i++;
			}
			stx[v4y]("vector"); stx[c2y]();
		}
		; STX[N7Z][l8M][Q0i] = function (stx) { STXChart[m7M] = STX[t5K][m7M]; stx[q5K](); }
		; STX.Drawing.comparison_stop.prototype.serialize = function () {
			var obj = { name: this[s5i], pnl: this[(k5Z + I4y + a6Z + K1y + J6Z + D5y + I4y + Y9Z + K1y)], d0: this[(u4y + y6K)] }
			; return obj;
		}
		; STX.Drawing.comparison_stop.prototype.reconstruct = function (stx, obj) { this[R5i] = stx; this[z4M] = obj[X4K]; this[T0i] = obj[T0i]; this[w2y](); }
		; STX[t98] = function () { var A1y = "Construct", E3y = "Tim"; this[o9v] = S9y4F.o6i; this[(S9y4F.b3y + a83 + A0i + k7Z + E3y + O2y + S9y4F.t3y)] = S9y4F.o6i; this[A1y](); }
		; L1F(S9y4F.K3B); STX.Markers.prototype.reset = function () {
			var Y1v = "overflow", q3M = "IV"; this[k7v] = []; if (!this[v73][o9v]) { this[v73][o9v] = document[i68]((g9y + q3M)); this[v73][o9v][q68][E63] = r9v; this[(W0i + b73)][o9v][q68][K1Z] = O9i; this[v73][o9v][q68][Y1v] = A9y; this[(W0i + b73)][o9v][q68][f0Z] = S9y4F.K3B; this[R5i][n48][t28][B73](this[v73][o9v]); this[R5i][X9y](); }
		}
		; STX.Markers.prototype.clear = function () {
			if (this[(G0M + a6Z + K1y + J6Z)][o9v]) { this[R5i][n48][t28][n9y](this[v73][o9v]); this[v73][o9v] = S9y4F.o6i; }
			this[s4v]();
		}
		; STX.Markers.prototype.placeMarker = function (node, date) {
			var U33 = "sortMarkers", v9y = "k2h", l08 = "T2h", e8M = "hover", F6K = "android", K6Z = "stemClass", y6y = "drawStems", o8i = "node", stx = this[R5i]; function incrementZIndex(e) { if (marker[H0M]) marker[H0M][q68][f0Z] = STX[t98][J48]; marker[o8i][q68][f0Z] = STX[t98][J48]++; }
			function takeFocus(e) { var t2v = "airs", h83 = "disp"; incrementZIndex(e); stx[Y4M] = "marker"; stx[(n0v + h83 + J6Z + I4y + q7Z + G2K + S63 + t2v)](); }
			function releaseFocus(e) { stx[Y4M] = ""; stx[z63](); }
			var marker = { node: node, date: date }
			; node[q68][G5v] = (H8M); if (this[y6y]) { var stem = document[i68]("DIV"); stem[L68] = this[K6Z]; stem[q68][E63] = "absolute"; stem[q68][G5v] = "none"; marker[H0M] = stem; }
			if (this[U5Z]) {
				if (!STX[F6K] && !STX[(S9y4F.W0Z + G0M + u4y)] && !STX[L6Z]) {
					marker[o8i][o48]("mouseover", (function (node, stx) {
						return takeFocus; }
					)(marker[o8i], stx)); marker[(P4K + u4y + K1y)][o48]("mouseout", (function (node, stx) {
						return releaseFocus; }
					)(marker[o8i], stx));
				}
				else {
					marker[o8i][o48]("touchstart", (function (node) {
						return incrementZIndex; }
					)(marker));
				}
			}
			else if (this[e8M]) {
				if (STX[Q7v] || STX[L6Z]) {
					marker[o8i][o48]("touchstart", (function (node) {
						return incrementZIndex; }
					)(marker));
				}
				else {
					marker[o8i][o48]((O58 + k5y + K23 + K1y + S9y4F.b3y), (function (node) {
						return incrementZIndex; }
					)(marker));
				}
			}
			this[k7v][e8Z](marker); node[q68][E63] = "absolute"; this[v73][o9v][B73](node); if (marker[H0M]) this[v73][o9v][B73](marker[H0M]); this[c9Z](this[v73][n48], marker); if (S9y4F[(l08)](this[k7v].length, 1)) {
				if (S9y4F[v9y](marker[x68], this[k7v][this[k7v].length - 2][x68])) { this[U33](); }
			}
			return marker;
		}
		; STX.Markers.prototype.sortMarkers = function () {
			function mySort(l, r) { var S7Z = "s2h", P23 = "J2h"; if (S9y4F[P23](l[x68], r[x68])) return -S9y4F.K3B; if (S9y4F[S7Z](l[x68], r[x68])) return S9y4F.K3B; return S9y4F.Y3B; }
			; this[k7v][e3y](mySort);
		}
		; STX.Markers.prototype.setMarkerTick = function (chart, marker) {
			var V6K = "j8h", D2M = "8h", U5v = "V8h", Y8M = "R2h", u48 = "Time", t63 = "date", N23 = "l2h", S2K = "b2h", b03 = "E2h"; for (var i = 0; S9y4F[b03](i, chart[B6K].length) ; i++) {
				var quotes = chart[B6K][i], qms = quotes[U3M][u68](), pms = qms; if (S9y4F[S2K](i, 0)) pms = chart[B6K][S9y4F[N23](i, 1)][U3M][u68](); var dms = marker[t63][(o53 + S9y4F.t3y + u48)](); if (S9y4F[Y8M](qms, dms)) { marker[x68] = i; return; }
				else if (S9y4F[U5v](qms, dms) && S9y4F[(c9y + D2M)](pms, dms)) { marker[x68] = Math[L8y](S9y4F[V6K](i, 1), 0); return; }
			}
		}
		; STX.Markers.prototype.createDataSet = function (stx) {
			var Y8i = "i8h"; for (var j = 0; S9y4F[Y8i](j, this[k7v].length) ; j++) { var marker = this[k7v][j]; this[c9Z](this[v73][n48], marker); }
		}
		; STX.Markers.prototype.initializeChart = function (stx) { this[(O4y + P7Z)] = stx; this[v73] = stx[w2K][this[z4M]]; this[s4v](); this[M7i](stx); }
		; STX.Markers.prototype.drawUnder = function (stx, chart) { }
		; STX.Markers.prototype.drawOver = function (stx, chart) {
			var E7v = "transitionMS", s2K = "redrawTimeout"; function draw(self, stx) {
				return function () {
					var y9i = "ntFu", S2Z = "lacem", Q5Z = "B8h", n68 = "t8h", c9K = "h8h", C6M = "P8h", W8M = "A8h", u5K = "F8h", v3y = "tFun"; self[s2K] = null; var panel = stx[w2K][self[z4M]]; if (!panel) return; if (!panel[A9y] && self[(k5Z + C7Z + j1y + K1y + a53 + v3y + j1y + S9y4F.t3y + S2y)]) {
						var chart = panel[n48], markerSet = [], firstTick = S9y4F[u5K](chart[B6K].length, stx[n48][i2v]), lastTick = firstTick + chart[q3B].length; for (var i = 0; S9y4F[W8M](i, self[k7v].length) ; i++) {
							var marker = self[k7v][i]; if (!marker[x68]) continue; var node = marker[(a6Z + S9y4F.p6K)], stem = marker[(l4i + Y9Z)]; if (S9y4F[C6M](marker[x68], firstTick) && S9y4F[c9K](marker[x68], lastTick)) {
								if (S9y4F[(n68)](node[q68][G5v], "block")) { node[q68][G5v] = "block"; if (stem) stem[(S9y4F.a5Z + U2Z + J6Z + K1y)][G5v] = "block"; }
								markerSet[e8Z](marker);
							}
							else {
								if (S9y4F[Q5Z](node[q68][G5v], "none")) { node[q68][G5v] = "none"; if (stem) stem[q68][G5v] = "none"; }
							}
						}
						self[(k5Z + S2Z + K1y + y9i + a6Z + j1y + y8K + a6Z)](self, stx, panel, markerSet);
					}
				}
				;
			}
			if (!this[s2K]) this[s2K] = setTimeout(draw(this, stx), this[E7v]);
		}
		; STX[H0i][N1v] = function (url) { this[Y6v] = url; }
		; STX[H0i][N1v][s7B](STX[(r7B + B3y + a5y + K2Z)]); STX.QuoteFeed.BarChart.prototype.isBats = function (symbol) { var c0v = "r8h"; if (S9y4F[c0v](symbol.length, 5)) return true; return false; }
		; STX.QuoteFeed.BarChart.prototype.symbology = function (symbol) { return symbol; }
		; STX.QuoteFeed.BarChart.prototype.batsOpen = function () { var E3B = "f8h", P7i = "y8h", l2y = "TDateT", nd = STX[(A4Z + j23 + d9y + l2y + R8i + K1y)](); if (S9y4F[P7i](nd[J3v](), S9y4F.n1Z)) return j8Z; if (S9y4F[E3B](nd[J3v](), S9y4F.Z3B)) return j8Z; return L9i; }
		; STX.QuoteFeed.BarChart.prototype.fetch = function (params, cb) {
			var e4Z = "postAjax", U63 = "&symbol=", o4i = '$', T3K = "c7h", i3M = "batsOpen", J23 = "isAfterDelayed", r2K = ".BZ", g2K = "delayed", h7K = "feed", F1y = "g8h", x6i = "ology", i7v = "mb", W2M = "&order=asc", e9M = "axRecords", r1K = "=", M9K = "&", x6M = "ticks", b38 = "O8h", w9i = "ord", A78 = "Rec", n28 = "&startDate=", N8v = "maxRecords", w4M = "&endDate=", u8K = "p8h", z8i = "&splits=true", G2Z = "&splits=false", S5K = "x8h", e0Z = "&interval=", W6v = "?type=minutes", M7y = "?type=formTMinutes", e0v = "extended", T3v = "?type=dailyContinue", b1Z = "isBats", i28 = "/getHistory.csv", url = this[Y6v] + i28, isbats = this[b1Z](params[e5K]); if (STXChart[E5Z](params[l2M])) { url += T3v; }
			else {
				if (params[e0v] && isbats) { url += M7y; }
				else { url += W6v; }
				url += e0Z + params[N8Z];
			}
			if (S9y4F[S5K](params[P8v], j8Z)) { url += G2Z; }
			else { url += z8i; }
			var myDate = new Date(); if (params[z0y]) {
				myDate = params[z0y]; if (STXChart[E5Z](params[l2M])) { myDate[m2y](S9y4F[u8K](myDate[c7K](), S9y4F.K3B)); }
				url += w4M + STX[B4v](myDate); if (!params[N8v]) params[N8v] = u53;
			}
			else {
				if (params[w8v]) {
					var startDate = new Date(params[w8v]); if (STXChart[E5Z](params[l2M])) { startDate[m2y](startDate[c7K]() + S9y4F.K3B); }
					url += n28 + STX[B4v](startDate); params[N8v] = S9y4F.Y3B;
				}
				else if (!params[N8v]) { params[(i8v + P7Z + A78 + w9i + S9y4F.a5Z)] = S9y4F[b38](params[x6M], S9y4F.o7B); }
			}
			if (params[N8v]) url += (M9K + Y9Z + I4y + P7Z + L3B + d1i + S9y4F.b3y + u4y + S9y4F.a5Z + r1K) + params[(Y9Z + e9M)]; url += W2M; var symbol = this[(S9y4F.a5Z + q7Z + i7v + x6i)](params[e5K]); if (isbats && S9y4F[F1y](params[h7K], g2K)) { if (symbol[K0M](r2K) == -S9y4F.K3B && (!STX[p6v][J23](symbol) || params[e0v]) && this[i3M]() && S9y4F[T3K](symbol[P0Z](S9y4F.Y3B), o4i)) symbol = symbol + r2K; }
			url += U63 + encodeURIComponent(symbol); var self = this; STX[e4Z](url, null, function (status, res) {
				var z3y = "n7h", c3K = "process", U8v = "C7h", A0v = "L7h"; if (S9y4F[A0v](status, 200)) {
					cb({ error: status }
					); return;
				}
				if (S9y4F[U8v](res, "\r\n")) {
					cb({ quotes: [] }
					); return;
				}
				var res = self[c3K](res, params), moreToLoad = true; if (!params[N8v] || S9y4F[z3y](res.length, params[N8v])) { moreToLoad = false; }
				cb({ quotes: res, moreAvailable: moreToLoad }
				);
			}
			);
		}
		; STX.QuoteFeed.BarChart.prototype.process = function (quotes, params) {
			var D6Z = "repl", h28 = "U7h", y1i = "m7h", T8i = "replace", A8v = "Q7h", J6i = "N7h", R4i = "Z7h", F4v = "a7h", interval = params[l2M], stx = params[R5i], symbol = params[e5K], newQuotes = [], arr = quotes[L9K]((t6K)); if (S9y4F[F4v](arr.length, 2)) return newQuotes; var fds = arr[0][L9K](","), fieldNames = {}
			; for (var i = 0; S9y4F[R4i](i, fds.length) ; i++) { fieldNames[fds[i]] = i; }
			var tzOffset = null; for (var i = 1; S9y4F[J6i](i, arr.length) ; i++) {
				var fields = arr[i][L9K](','); if (S9y4F[A8v](fields.length, fds.length)) continue; var field = fields[fieldNames["timestamp"]][T8i](/"/g, ""); if (S9y4F[y1i](field, "")) continue; var bcdt = new Date(field); if (params[w8v] && S9y4F[h28](bcdt, params[w8v])) continue; newQuotes[(k5Z + f6v + S9y4F.n0Z)]({ Date: STX[B4v](bcdt), Open: parseFloat(fields[fieldNames["open"]][T8i](/"/g, "")), High: parseFloat(fields[fieldNames["high"]][T8i](/"/g, "")), Low: parseFloat(fields[fieldNames["low"]][T8i](/"/g, "")), Close: parseFloat(fields[fieldNames[(j1y + J6Z + y43 + K1y)]][(O0M + C7Z + j1y + K1y)](/"/g, "")), Volume: parseFloat(fields[fieldNames["volume"]][(D6Z + L7Z)](/"/g, "")), Adj_Close: parseFloat(fields[fieldNames["close"]][T8i](/"/g, "")) }
				);
			}
			return newQuotes;
		}
		; return _exports;
	}
	{
		if (typeof define === (q4Z + l7B + S9y4F.t3y + S2y) && define[(Q1v)]) {
			define(["stxThirdParty", "stx"], function (_stxThirdParty, _stx) { return _stxKernel_js(_stxThirdParty, _stx); }
			);
		}
		else {
			var Y1F = function (C1F) { _stxThirdParty = C1F[E2v]; }
			; var _stxThirdParty = {}
			; if (typeof (window[E2v]) != C53) Y1F(window); var _stx = { "STX": window[(U3B + u93)], "STXChart": window[Q7i], "STX.LegacyMarket": window[N5K][p6v], "STX.Studies": window[N5K][(U3B + w7Z + K1y + S9y4F.a5Z)], "$$": window[(q9y)], "$$$": window[B4M] }
			; _stxKernel_js(_stxThirdParty, _stx);
		}
	}
}
)();
