<template>
	<view class="privacy-policy-container">

		<scroll-view scroll-y="true" class="content-scroll" :scroll-into-view="scrollTargetId" scroll-with-animation>
            <view id="scroll-wrapper">
			    <view v-html="policyContentHtml"></view>
            </view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 存储HTML内容的字符串
				policyContentHtml: `
<h1 id='锦麒行用户协议'>《锦麒行用户协议》</h1>
    <p><strong>欢迎您使用锦麒行小程序！</strong></p>
    <p>本《锦麒行用户协议》（以下简称“本协议”）是您（以下或称“用户”）与锦麒行（以下简称“我们”或“本平台”）之间关于使用锦麒行小程序（以下简称“本服务”）所订立的有效合约。<strong>在您开始使用本服务前，请您务必仔细阅读并充分理解本协议的全部内容，特别是免除或者限制我们责任的条款、对用户权利进行限制的条款、约定争议解决方式和司法管辖的条款等。这些条款可能以加粗形式提示您注意。</strong>
    </p>
    <p><strong>如果您不同意本协议的任何内容，或者无法准确理解相关条款的解释，请不要进行后续操作。当您通过页面勾选、点击确认、实际使用本服务或以其他任何方式选择接受本协议后，即表示您已充分阅读、理解并接受本协议的全部内容，并与我们达成一致，本协议对双方均具有法律约束力。</strong>
    </p>
    <p><strong>若您是未满18周岁的未成年人，请在法定监护人的陪同下阅读本协议，并事先取得法定监护人的同意。</strong></p>
    <h2 id='一服务说明'>一、服务说明</h2>
    <ol start=''>
        <li>
            <p><strong>服务内容</strong>：锦麒行是一款旨在通过“校友向导”角色帮助各年龄段同学及家长深度探索校园文化、提供个性化校园游览需求定制、校园内容分享与互动的小程序。具体服务包括但不限于：</p>
            <ul>
                <li>个性化游览需求发布：用户可以根据自身需求，发布校园游览的日期、时间、人数、特殊要求（如接送、无障碍、摄影、外语服务等）及备注信息。</li>
                <li>内容浏览与互动：用户可以浏览平台发布的校园介绍、攻略等帖子内容，并进行评论、点赞等互动操作。</li>
                <li>订单管理：用户可以查看和管理自己发布的游览需求订单，包括订单状态跟踪、选择导游（如适用）、查看订单详情等。</li>
                <li>账户管理：用户可以通过微信授权登录，管理个人账户信息，包括退出登录等。</li>
                <li>客户服务：用户可以通过平台提供的客服渠道进行咨询和反馈。</li>

            </ul>
        </li>
        <li>
            <p><strong>服务形式</strong>：本服务目前主要通过微信小程序的形式提供。我们保留未来根据业务发展需要，变更服务形式或增加新的服务形态的权利。</p>
        </li>
        <li>
            <p><strong>服务许可</strong>：我们授予您一项个人的、不可转让的、非独占的和非商业的合法使用本服务的许可。本协议未明示授权的其他一切权利仍由我们保留，您在行使这些权利时须另外取得我们的书面许可。
            </p>
        </li>

    </ol>
    <h2 id='二账户注册与使用'>二、账户注册与使用</h2>
    <ol start=''>
        <li>
            <p><strong>账户获取</strong>：您需要通过微信授权登录的方式注册并使用本服务。您授权我们获取您的微信公开信息（包括昵称、头像）以及微信提供的唯一用户标识（OpenID），用于创建和管理您的锦麒行账户。
            </p>
        </li>
        <li>
            <p><strong>账户安全</strong>：您的账户仅限您本人使用，禁止赠与、借用、租用、转让或售卖。您有责任妥善保管您的账户信息（包括但不限于微信账户密码、本平台自动生成的会话密钥等），并对在您账户下发生的所有活动承担法律责任。如您发现账户存在安全风险，请立即通知我们。
            </p>
        </li>
        <li>
            <p><strong>信息真实性</strong>：您在注册和使用本服务时，应保证所提供的信息真实、准确、完整、有效。如有变更，应及时更新。因您提供的信息不真实、不准确、不完整或无效所导致的任何责任和损失，由您自行承担。
            </p>
        </li>
        <li>
            <p><strong>用户行为规范</strong>：您在使用本服务过程中，必须遵守国家法律法规及相关政策，不得利用本服务从事任何违法违规或侵犯他人合法权益的行为，包括但不限于：</p>
            <ul>
                <li>发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；</li>
                <li>发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</li>
                <li>进行任何危害计算机网络安全的行为；</li>
                <li>进行任何破坏本服务公平性或者其他影响正常秩序的行为，如恶意刷单、作弊等；</li>
                <li>其他任何干扰本服务正常运营或侵犯其他用户或第三方合法权益的行为。</li>

            </ul>
        </li>
        <li>
            <p><strong>用户产生内容</strong>：您在本平台发布的内容（如评论、需求备注等）的知识产权归您或相关权利人所有。您同意授予我们一项全球范围内的、免费的、非独占的、可再许可的权利，以使用、复制、修改、改编、发布、翻译、据以创作衍生作品、传播、表演和展示此等内容，或将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中。您保证您对所发布的内容拥有合法的权利，且不会侵犯任何第三方的合法权益。
            </p>
        </li>

    </ol>
    <h2 id='三订单与服务'>三、订单与服务</h2>
    <ol start=''>
        <li><strong>需求发布</strong>：您在发布游览需求时，应确保所填写信息的真实性和准确性。需求提交后，平台将根据您提供的信息进行后续处理，包括但不限于匹配导游资源（如适用）。</li>
        <li><strong>服务费用</strong>：部分服务（如特定的导游服务）可能涉及费用。具体费用标准将在相关服务页面明示。您应按照页面提示支付相关费用后方可享受相应服务。</li>
        <li><strong>服务提供与变更</strong>：我们将尽力保障服务的顺利提供。但因不可抗力、第三方原因或平台自身运营调整等因素，服务可能会发生变更、中断或终止。发生此类情况时，我们将尽可能提前通知您，并根据实际情况处理后续事宜。
        </li>
        <li><strong>导游服务（如适用）</strong>：若您的需求涉及导游服务，平台将努力为您匹配合适的导游。导游的服务质量和行为由导游本人负责，平台将建立相应的管理和评价机制，但不对导游的个别行为承担直接责任，除非法律另有规定。
        </li>
        <li><strong>评价与反馈</strong>：您有权对所接受的服务进行评价。您的评价应真实、客观，不得包含恶意攻击或不实信息。</li>

    </ol>
    <h2 id='四知识产权'>四、知识产权</h2>
    <ol start=''>
        <li>本平台及本服务所包含的商标、文字、图片、音频、视频、界面设计、版面框架、软件代码等所有内容（用户自行上传的内容除外）的知识产权均归我们或相关权利人所有。未经我们或相关权利人事先书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。
        </li>
        <li>您不得对本服务进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现本服务的源代码。</li>

    </ol>
    <h2 id='五隐私保护'>五、隐私保护</h2>
    <p>我们高度重视您的个人信息保护。关于我们如何收集、使用、存储、共享和保护您的个人信息，以及您如何管理您的个人信息，请您详细阅读《锦麒行隐私政策》。该政策是本协议不可分割的组成部分，与本协议具有同等法律效力。</p>
    <h2 id='六免责声明与责任限制'>六、免责声明与责任限制</h2>
    <ol start=''>
        <li><strong>不可抗力</strong>：对于因不可抗力（包括但不限于自然灾害、战争、罢工、政府行为、通讯线路故障、黑客攻击等）造成的服务中断或您遭受的损失，我们不承担责任。</li>
        <li><strong>第三方服务</strong>：本服务中可能包含指向第三方网站或服务的链接。这些第三方服务并非由我们运营，其内容、产品、广告以及其他任何信息均由相应第三方提供并负责。您需自行判断并承担使用第三方服务的相关风险。
        </li>
        <li><strong>用户行为</strong>：您因违反本协议或相关法律法规而导致的任何法律责任，均由您自行承担。若因此给我们或第三方造成损失的，您还应承担赔偿责任。</li>
        <li><strong>服务稳定性</strong>：我们将尽最大努力维护本服务的安全和稳定，但不能保证服务在任何时候均无中断或无故障。因设备维护、系统升级、网络故障等原因导致的服务中断或延迟，我们将尽可能提前通知，但不承担由此产生的直接或间接损失。
        </li>
        <li><strong>责任上限</strong>：在法律允许的最大范围内，我们对您因使用本服务所遭受的任何间接性、后果性、惩戒性、偶然性、特殊性或刑罚性的损害，包括因使用本服务而遭受的利润损失，不承担责任（即使我们已被告知该等损失的可能性）。我们对您承担的全部责任，无论因何原因或何种行为方式，始终不超过您在服务期内因使用本服务而支付给我们的费用总额（如有）。
        </li>

    </ol>
    <h2 id='七协议的变更与终止'>七、协议的变更与终止</h2>
    <ol start=''>
        <li>
            <p><strong>协议变更</strong>：我们有权根据国家法律法规的变化及维护交易秩序、保护消费者权益的需要，不时修改本协议。修改后的协议将在本平台进行公示，并于公示期满后生效。若您不同意修改后的协议内容，您有权停止使用本服务。若您在协议生效后继续使用本服务，则视为您已接受修改后的协议。
            </p>
        </li>
        <li>
            <p><strong>服务终止</strong>：</p>
            <ul>
                <li>如您违反本协议的约定，我们有权酌情决定中止或终止向您提供部分或全部服务，并追究您的相关责任。</li>
                <li>我们有权根据自身运营策略调整，提前通过公告等方式通知您后，中止或终止提供本服务。</li>
                <li>服务终止后，我们将按照法律规定处理您的个人信息及其他相关事宜。</li>

            </ul>
        </li>

    </ol>
    <h2 id='八法律适用与争议解决'>八、法律适用与争议解决</h2>
    <ol start=''>
        <li><strong>法律适用</strong>：本协议的订立、效力、解释、履行、修订和争议解决均适用中华人民共和国大陆地区法律。</li>
        <li><strong>争议解决</strong>：因本协议引起的或与本协议有关的任何争议，双方应首先友好协商解决；协商不成的，任何一方均有权将争议提交至<strong>本协议签署地（即上海锦麒行旅游信息咨询有限公司所在地）有管辖权的人民法院</strong>通过诉讼解决。
        </li>

    </ol>
    <h2 id='九通知与送达'>九、通知与送达</h2>
    <ol start=''>
        <li>本协议项下我们对于用户所有的通知均可通过小程序内公告、站内信、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</li>
        <li>用户对于我们的通知应当通过我们正式对外公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</li>

    </ol>
    <h2 id='十其他'>十、其他</h2>
    <ol start=''>
        <li><strong>协议完整性</strong>：本协议构成双方就本协议项下服务所达成的完整协议，取代双方之前就相同事项达成的所有口头或书面协议、谅解、备忘录和讨论。</li>
        <li><strong>可分割性</strong>：如果本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本协议的其余条款仍应有效并且有约束力。</li>
        <li><strong>标题</strong>：本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</li>
        <li><strong>未行使权利</strong>：我们未行使或延迟行使其在本协议项下的任何权利、权力或特权，不应视为对该等权利、权力或特权的放弃；任何单独或部分行使该等权利、权力或特权，亦不应妨碍其进一步行使或行使其他权利、权力或特权。
        </li>

    </ol>
    <p><strong>如果您对本协议有任何疑问、意见或建议，欢迎通过小程序内提供的客服渠道与我们联系。</strong></p>
    <p><strong>上海锦麒行旅游信息咨询有限公司</strong></p>
                `
			}
		},
        onLoad() {

        },
		methods: {
			
		}
	}
</script>

<style scoped>
.privacy-policy-container {
	display: flex;
	flex-direction: row;
	height: 100vh; /* 让容器占满整个屏幕高度 */
	background-color: #f8f8f8; /* 页面背景色 */
}

/* 主要内容区域 */
.content-scroll {
	flex: 1; /* 占据剩余空间 */
	height: 100%; /* 必须设置高度 */
	padding: 15px;
	box-sizing: border-box; /* padding 不会撑开元素 */
    background-color: #ffffff;
}

/* 针对 v-html 渲染内容的样式 */
/* 你需要在此处添加或调整样式以匹配原HTML的视觉效果 */
/* 使用 >>> 或 /deep/ 或 ::v-deep 来穿透 scoped 限制 */
.content-scroll >>> h1 {
	font-size: 22px;
	margin-bottom: 15px;
    margin-top: 10px;
	font-weight: bold;
    color: #111;
}

.content-scroll >>> h2 {
	font-size: 18px;
	margin-top: 25px;
	margin-bottom: 10px;
	padding-bottom: 5px;
	border-bottom: 1px solid #eee;
    font-weight: bold;
    color: #222;
}

.content-scroll >>> p {
	font-size: 14px;
	line-height: 1.8;
	margin-bottom: 12px;
    color: #333;
}

.content-scroll >>> strong {
	font-weight: bold;
    color: #000;
}

.content-scroll >>> ol,
.content-scroll >>> ul {
	padding-left: 25px; /* 列表缩进 */
    margin-bottom: 12px;
}

.content-scroll >>> li {
	margin-bottom: 8px;
    line-height: 1.7;
    font-size: 14px;
    color: #333;
}
.content-scroll >>> li p {
    margin-bottom: 5px; /* 列表项内段落间距小一点 */
}

.content-scroll >>> a {
    color: #007aff;
    text-decoration: none;
}
.content-scroll >>> a:hover {
    text-decoration: underline;
}


</style>