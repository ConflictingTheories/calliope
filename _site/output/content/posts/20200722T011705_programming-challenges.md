# Programming Challenges

~ 2020-07-22T01:17:05+00:00 ~

The nature of the beast in job hunting for a technical position is that you will inevitably be required to perfrom some form of programming or technical assessment 95% of the time.

I recently had some and being that I haven’t been job hunting for a while – I felt like I was rusty – so I figured I would share some content while I work through some problems:

**Add Binary Strings**

```
// Seems Complex for such a simple thing
function addBinaryStrings(a, b) {
   let len = a.length > b.length ? a.length : b.length,
       ar = a.padStart(len, '0').split(''),
       br = b.padStart(len, '0').split(''),
       out = new Array(len).fill(0),
       i = len;
   while (i--) {
       let o = i >= 0 ? out[i] : 0,
           an = ar.length > i ? parseInt(ar[i], 2) : 0,
           bn = br.length > i ? parseInt(br[i], 2) : 0,
           rn = (an & bn) ? 1 : 0,
           rn2 = (an & bn & o) ? 1 : 0;
       out[i] = (an & bn) ? (rn2 ? 1 : 0) : (o ? (an | bn ? 0 : 1) : (an | bn ? 1 : 0));
       if (rn) {
           if (i == 0)
               out.unshift(1);
           else
               out[i - 1] = 1;
       }
   }
   return out.map(x => x.toString()).join('');
}

// Good Binary Trim Feature
function trimBinaryString(str) {
   return str.replace(/^0+/, '');
}

```

**HashMap**

```
// Hash Map & Return Sum Result
let hash = {};

function hashMap(queryType, query) {
   let len = queryType.length;
   let i = -1;
   let res = 0;
   while (++i < len) {
       let cmd = queryType[i];
       let q = query[i];
       let out = runCmd(cmd, q);
       if (typeof out !== 'undefined' && !isNaN(out))
           res += out;
   }
   return res;
}

// Run Cmd
function runCmd(cmd, query) {
   let res = 0;
   switch (cmd) {
       case 'insert':
           insert(...query);
           break;
       case 'addToValue':
           addToValue(...query);
           break;
       case 'addToKey':
           addToKey(...query);
           break;
       case 'get':
           res = get(...query);
           break;
       default:
           break;
   }
   return res;
}

// CMD :: Insert Cmd
function insert(x, y) {
   let key = `${x}`;
   hash[key] = y;
}

// CMD :: Get Cmd
function get(x) {
   return hash['' + x];
}

// CMD :: Add Number to ALL Keys in Hash Map
function addToKey(x) {
   let newHash = [];
   let keys = Object.keys(hash);
   keys.map((n) => {
       newHash['' + (parseInt(n) + x)] = hash[n];
   })
   hash = newHash
}

// CMD :: Add number to ALL values in Hash Map
function addToValue(y) {
   Object.keys(hash).map((x) => {
       hash[x] += y;
   });
}
```

**Grouping by Averages**

```
// Group by Mean (Averages)
function meanGroups(a) {
   let means = a.map(x => x.reduce((s, y) => s + y) / x.length);
   let un = new Set(means);
   return Array.from(un).map((x) => {
       return means.map((y, i) => {
           return y === x ? i : false
       }).filter(x => x !== false)
   })
}
```

**Alternating Sort Comparison**

```
// Alternating Sort Check
function alternatingSort(a) {
   let b = [];
   let count = 0;
   let i = -1;
   while (++i < a.length) {
       let pos = a.length - count;
       b[count] = count === 0 ? a[count] : a[pos];
       count++;
   }
   console.log(a,b);
   return !isNaN(b.reduce((s = null, x, i) => {console.log(x,s); return (s === null || x >= s) && (s !== NaN) ? x : NaN }));
}

```

**Shape Area Calculations**

```
// Returns Area of Shape
let cache = [1];
function shapeArea(n) {
   if(cache[n-1])
       return cache[n-1]
   else
       return cache[n-1] = n >= 2 ? shapeArea(n-1) + 4*(n-1) : n == 1 ? 1 : 0;
}
```
