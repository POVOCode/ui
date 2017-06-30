/**
 * Merges multiple string and object classname definitions, returns a string.
 * String/object defs are passed in via a variable-length argument list.
 *
 * @return {string} className
 */
const mergeClassNames = (...args) => {
  args = args.filter(v => !!v);

  if(args.length == 0) {
    return;
  } else if(args.length == 1) {
    if(typeof args[0] == "string") {
      return args[0];
    } else if(typeof args[0] == "object") {
      return Object.keys(args[0])
        .filter(k => !!args[0][k])
        .join(" ");
    }
  } else {
    const objectDef = {};

    args.forEach((def) => {
      if(typeof def == "string") {
        def.split(" ").forEach((c) => { objectDef[c] = true; });
      } else if(typeof def == "object") {
        Object.keys(def).forEach((k) => { objectDef[k] = def[k]; });
      }
    });

    return Object.keys(objectDef)
      .filter(k => !!objectDef[k])
      .join(" ");
  }
}

export default mergeClassNames;

