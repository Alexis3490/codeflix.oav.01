module.exports=function parseEnv(content)
{
    const lines = content.split("\n")
    const newObj = {};
    for (const line of lines)
    {
            if(line.match(/^(([\w]+)=(.+))/gm))
            {
                const text=line.slice(0,line.length-1);
                const  item= text.split("=");
                newObj[item[0]]=item[1];
            }
        }
    return JSON.stringify(newObj, null, 4);
}