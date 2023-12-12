import dynamic from 'next/dynamic';
import WithRepoBasic from "../../components/With-Repo-Basic"
import api from '../../lib/api';

const MarkdownRenderer = dynamic(() => import("../../components/MarkdownRenderer"));

function Detail({ readme }) {
  return <MarkdownRenderer content={readme.content} isBase64={true} />
}

Detail.getInitialProps = async ({ ctx: { query: {owner, name}, req, res } }) => {
  const readmeResp = await api.request({
    url: `/repos/${owner}/${name}/readme`
  }, req, res)

  console.log(readmeResp.data);

  return {
    readme: readmeResp.data
  }
}

export default WithRepoBasic(Detail, 'index');