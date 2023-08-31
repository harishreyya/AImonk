

const child = () => {

    const insertChild = function (tree,commentId, item) {
      if (tree.id === commentId) {
        tree.children.push({
          id: Math.random(20000),
          commentName: item,
          children: [],
        });
        // let res = JSON.stringify(tree)
        // console.log("export-",res)
        return tree;
      }
  
      let latestChild = [];
      latestChild = tree.children.map((obj) => {
        return insertChild(obj, commentId, item);
      });
      
   
      return { ...tree, children: latestChild };
    };
  
    const editChild = (tree,
       commentId, value) => {
      if (tree.id === commentId) {
        tree.commentName = value;
        return tree;
      }
  
      tree.children.map((obj) => {
        return editChild(obj, commentId, value);
      });
  
      return { ...tree };
    };
  
   
    return { insertChild, editChild };
  };
  
  export default child;
  