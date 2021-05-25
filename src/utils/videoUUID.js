// 摄像头UUID跟imei匹配
class MatchUUID {
  constructor() {
    this.uuidList = [
      // 惠景慧园
      {
        uuid: '26cb6f3dc47b417f894088acb3548cb5',
        address: '惠景慧园4-1单元大堂',
        imei: '21024125409SLB000873'
      },
      {
        uuid: '04c2abcf9d63445699389410a132b00c',
        address: '惠景慧园4-2单元大堂',
        imei: '21024125409SLB000464'
      },
      {
        uuid: 'cdccddfb63ba44aa95fbd40cff23db15',
        address: '惠景慧园4-1后门高抛2-9楼',
        imei: '21024125049SLB000450'
      },
      {
        uuid: '90f43f52bef14a34bec73602b239675a',
        address: '惠景慧园5-1后门高抛10-22楼',
        imei: '21024125049SLB000473'
      },
      {
        uuid: 'd9de1101f8594f01a7fd265191e36442',
        address: '惠景慧园5-2后门高抛10-22楼',
        imei: '21024125049SLB000020'
      },
      {
        uuid: '3a81654d50e2419aa8692645cdbdb60a',
        address: '惠景慧园5-2后门高抛2-9楼',
        imei: '21024125049SLB000493'
      },
      {
        uuid: '09448be5793c4bd0834e25af71465c7e',
        address: '惠景慧园4-1后门高抛10-22楼',
        imei: '21024125049SLB000481'
      },
      {
        uuid: '783ea08c66df41d1abf46944cf723b9e',
        address: '惠景慧园4-2后门高抛10-22楼',
        imei: '21024125049SLB000466'
      },
      {
        uuid: '26cb4dff4cea45e6bd71419fab78e4fb',
        address: '惠景慧园5-1后门高抛2-9楼',
        imei: '21024125049SLB000455'
      },
      {
        uuid: 'bdd8b8e194714318b9b3d334d0f6bac5',
        address: '惠景慧园4-2后门高抛2-9楼',
        imei: '21024125049SLB000454'
      },
      {
        uuid: 'b5986bff0b53438a9ed0f13c24909bd2',
        address: '惠景慧园6栋大堂',
        imei: '21024125409SLB000434'
      },
      {
        uuid: '3d4e0ddd33eb4b26a44804a23b0d3bd6',
        address: '惠景慧园7栋大堂',
        imei: '21024125409SLB000558'
      },
      {
        uuid: 'b8e67e29a10749478672b6ae9fb8cb0c',
        address: '惠景慧园1栋大堂',
        imei: '21024125409SLB000955'
      },
      {
        uuid: '570ec62340f24b7099106ff57235c56c',
        address: '惠景慧园2栋大堂',
        imei: '21024125409SLB000904'
      },
      {
        uuid: 'f87c065ca11f4b2a8ee1b6e2d5ae1c17',
        address: '惠景慧园5栋2单元大堂',
        imei: '21024125409SLB000828'
      },
      {
        uuid: '5a2011325737475fa165b8d109fb461b',
        address: '惠景慧园5栋1单元大堂',
        imei: '21024125409SLB000820'
      },
      {
        uuid: 'bd28cf3667e8492daa2ba968a56bcfe3',
        address: '3栋1楼入电梯间正墙面',
        imei: '21024125409SLB000008'
      },
      {
        uuid: 'addcc650e9e54dafba15a3198d9fe6c5',
        address: '4栋2单元正面方花园内A',
        imei: '21024125049SLB000004'
      },
      {
        uuid: '3158ef2d55af407887b80aca5f06c833',
        address: '5栋1单元正面方花园内B',
        imei: '21024125049SLB000064'
      },
      {
        uuid: '4d66672c9b164554acda127c6198d5dc',
        address: '5栋2单元右侧面方花园内B',
        imei: '21024125049SLB000071'
      },
      {
        uuid: '85c02f94a28842caba6536b09690a604',
        address: '5栋1单元正面方花园内A',
        imei: '21024125049SLB000078'
      },
      {
        uuid: '341193083e404429aa1cde2d711611c2',
        address: '5栋1单元右侧面方花园内A',
        imei: '21024125049SLB000088'
      },
      {
        uuid: '37fc3eb6aa2c4bbfbd68d45ca9313c0c',
        address: '4栋2单元右侧面方花园内A',
        imei: '21024125049SLB000090'
      },
      {
        uuid: 'e7616abf81ad42c2b555cb560168f488',
        address: '4栋2单元正面方花园内B',
        imei: '21024125049SLB000100'
      },
      {
        uuid: 'ca3847dbd08840019183604405570802',
        address: '4栋1单元正面方花园内A',
        imei: '21024125049SLB000101'
      },
      {
        uuid: '9b059974de784b8b941cf633c588fb6a',
        address: '5栋2单元右侧面方花园内A',
        imei: '21024125049SLB000102'
      },
      {
        uuid: 'e5d04060b2ae4189b6b362b4f84d0d7e',
        address: '4栋2单元左侧面方花园内A',
        imei: '21024125049SLB000113'
      },
      {
        uuid: '40de83c49e694a038b689fe9bdd71479',
        address: '5栋2单元正面方花园内B',
        imei: '21024125049SLB000117'
      },
      {
        uuid: '6926500745504b1e9118b3cbd37f4329',
        address: '4栋1单元正面方花园内B',
        imei: '21024125049SLB000138'
      },
      {
        uuid: 'a27654ce3969470f916f6d1eb61e4567',
        address: '5栋1单元右侧面方花园内B',
        imei: '21024125049SLB000166'
      },
      {
        uuid: '43d8700a3b414af7b3024dc0604710de',
        address: '4栋2单元左侧面方花园内B',
        imei: '21024125049SLB000167'
      },
      {
        uuid: 'd9afc508eb914ff6b2cb99ec686cbe83',
        address: '4栋2单元右侧面方花园内B',
        imei: '21024125049SLB000172'
      },
      {
        uuid: '8844ca6bffad46efb8d6261edc58c80f',
        address: '5栋1单元左侧面方花园内B',
        imei: '21024125049SLB000447'
      },
      {
        uuid: '8b872d4ef4964231b0df7c18605c9748',
        address: '5栋1单元左侧面方花园内A',
        imei: '21024125049SLB000461'
      },
      {
        uuid: 'cfd6df84261445cc8f9226ecb8cd3b32',
        address: '5栋2单元正面方花园内A',
        imei: '21024125049SLB000499'
      },
      {
        uuid: '2bcf0393abca44ebae9a00317a7c095b',
        address: '3栋正面方花园内',
        imei: '21024125049SLB000147'
      },
      // 港湾一号
      {
        uuid: 'e93e5a91056a4d5f8bf6087589dd2f7a',
        address: '港湾大道出入口',
        imei: '2102352KCPWMLC002463'
      },
      {
        uuid: 'a4754af932ef44258c43d7c4647db0bc',
        address: '港1出口',
        imei: '2102352KCPWMLC002560'
      },
      {
        uuid: '5d9bfa91e79846a397134dcc01cc2004',
        address: '纳睿达出入口',
        imei: '2102353PHXWMM2000142'
      },
      {
        uuid: '5bb486f583ff4a209a68806667d22185',
        address: '湾6门前停车场围墙B',
        imei: '2102352KCPWMLC002604'
      },
      {
        uuid: '74e5e06186194a4084566a3584b76d4b',
        address: '1号公馆大堂门前围墙',
        imei: '2102353PJCWMM1000418'
      },
      {
        uuid: '6b34b19e89d24b40944ef7e9fdd46690',
        address: '湾6门前停车场围墙C',
        imei: '2102353PJCWMM1000003'
      },
      {
        uuid: '383551cedf8d49be93d285fd907006bf',
        address: '湾6门前停车场立杆（消防围墙边）B',
        imei: '2102353PJCWMM1000288'
      },
      {
        uuid: 'a5dd0599377a4e4c8b069e27e9643ece',
        address: '湾9门前停车位A',
        imei: '2102353PJCWMM1000270'
      },
      {
        uuid: 'fbe252528c714cc3abb8645453de9fed',
        address: '湾8门前停车位转角A',
        imei: '2102353PJCWMM1000358'
      },
      {
        uuid: '1855342eae8e4edb8ab4a1d7bb86739e',
        address: '湾9门前停车位B',
        imei: '2102353PJCWMM1000407'
      },
      {
        uuid: '078be314f6ea4af0b9f44fb1534eeba8',
        address: '湾8门前停车位转角B',
        imei: '2102353PJCWMM1000481'
      },
      {
        uuid: '1ea8d089e31a416e91e5a7284aa558f4',
        address: '湾6门前停车场围墙A',
        imei: '2102353PJCWMM1000002'
      },
      {
        uuid: '004379a3f3cd4daa96245ceaff0e5495',
        address: '湾区6栋后门违停监测B',
        imei: '2102352KCPWMLC002429'
      },
      {
        uuid: '33d3825f4a9741abbd59e0aaf3286145',
        address: '湾9后门2楼墙上',
        imei: '2102412024LTLA000365'
      },
      {
        uuid: '8d3250b69b4d4d6989011371160986cd',
        address: '湾10后门2楼墙上',
        imei: '2102352KCPWMLC002576'
      },
      // 1个imei码对应2个uuid，有问题
      // {
      //   uuid: '1da2d20615ca40a3beef403c18da4fd9',
      //   address: '湾区9栋后门违停监测',
      //   imei: '2102352KCPWMLC002408'
      // },
      {
        uuid: '84a0c362aa4744a499f4264e442295e7',
        address: '湾区8栋后门违停监测',
        imei: '2102352KCPWMLC002408'
      },
      // 1个imei码对应2个uuid，有问题
      {
        uuid: 'aab8000b21f949a990a1ec52e97ae97e',
        address: '1号公馆高点特写',
        imei: '2102412551LTLC000342'
      },
      {
        uuid: 'aab8000b21f949a990a1ec52e97ae97e',
        address: '1号公馆高点广角',
        imei: '2102412551LTLC000342'
      },
      // 1个imei码对应2个uuid，有问题
      {
        uuid: 'db1fad682e50480ab5380cf0c0a496f3',
        address: '创意云端楼顶A特写',
        imei: '2102412551LTLC000241'
      },
      {
        uuid: '558228fec8194e33a497270efdb532c9',
        address: '创意云端楼顶A广角',
        imei: '2102412551LTLC000241'
      },
      // 1个imei码对应2个uuid，有问题
      {
        uuid: '8c3ee91104964690b284b972b3f28a1a',
        address: '创意云端楼顶B特写',
        imei: '2102412551LTLC000165'
      },
      {
        uuid: 'd3599b22413d481d96ec3bff8b9fc185',
        address: '创意云端楼顶B广角',
        imei: '2102412551LTLC000165'
      },
      // {
      //   uuid: '',
      //   address: '创意云端路面路灯',
      //   imei: '2102353PHXWMM2000151'
      // },
      // {
      //   uuid: '',
      //   address: '港1栋门前保安亭',
      //   imei: '2102352KCPWMLC002575'
      // },
      // {
      //   uuid: '7f0a0abf3eb24e828ca92309372ab01a',
      //   address: '港湾1号东门保安亭旁',
      //   imei: '2102353PHXWMM2000484'
      // },
      // 唐家第一工业区
      {
        uuid: '3918a1fe7ef842dc80fc767da443a1dd',
        address: '唐一工地后门态势',
        imei: '2102412464WLL4005199'
      },
      {
        uuid: '410d93091eec4f7e9b4e35a467767664',
        address: '唐一工地生活区态势A',
        imei: '2102412464WLL4005189'
      },
      {
        uuid: '6a6be51514814b64934ceabd6e616955',
        address: '唐一工地正门安全帽',
        imei: '2102352KCPWMLC002545'
      },
      {
        uuid: '81c2981573f3430e9829cd3228122da4',
        address: '唐一工地后门安全帽',
        imei: '2102352KCPWMLC002473'
      },
      {
        uuid: '9683c3e0b2874209a95ba5ec4d8ed469',
        address: '唐一工地生活区态势B',
        imei: '2102412464WLL4005194'
      },
      // 金发工业
      {
        uuid: '6d94c737f4f046bfb9f5707ccc0349e1',
        address: '金发工地围墙高点态势',
        imei: '2102412464WLL4005201'
      },
      {
        uuid: '63e2ca9d0ef842c0b7d2dec6bd85061c',
        address: '金发工地后门态势',
        imei: '2102352KCPWMLC002454'
      },
      {
        uuid: '84c3e8fadfcd426388ae673dc859e558',
        address: '金发工地后门安全帽',
        imei: '2102412464WLL4011010'
      },
      {
        uuid: '6d94c737f4f046bfb9f5707ccc0349e1',
        address: '金发工地正门态势',
        imei: '2102412024LTLA000743'
      },
      {
        uuid: '0be189b7da244e04a0280ae95f8f9d69',
        address: '金发工地正门安全帽',
        imei: '2102352KCPWMLC002413'
      },
      // 金鸿
      {
        uuid: '6ca4d41883d247fd8a64c0513fa34d1a',
        address: '金鸿工地左侧',
        imei: '190d4fd960a6474592ba9ef08520cf9e'
      },
      {
        uuid: '22e7037608ae4c1aa1d5fff447f4ec87',
        address: '金鸿工地塔吊',
        imei: 'd46efd17bd684f2aa94d5b8f1492658f'
      },
      {
        uuid: '5c38163df1c14fda88ee3b42f8407131',
        address: '金鸿工地出入口',
        imei: '83d9fb34cd5e469b94fc8ba6c3c400c7'
      },
      // 后环
      {
        uuid: '7720cce128024767ad014d2be921d45a',
        address: '后环工地生活区安全帽',
        imei: '41c71bc475a744d7ab37f744e274c68a'
      },
      {
        uuid: 'c1bff5bdba4e4fddbc73afe8d465f966',
        address: '后环工地大门口安全帽',
        imei: 'df4fea3c7e2f425dab586388f738f069'
      },
      {
        uuid: '43c9a76e9f4f4c7abbe3a1c2d3dda424',
        address: '后环工地工地东面',
        imei: '1e65c423634142cbbf21214321a3582b'
      },
      {
        uuid: '05f3c844c5114a57bd226a812c19610f',
        address: '工地西面',
        imei: '30f0bfc210e04b0d9e1ac6f459446d7b'
      },
      // 惠景和园
      {
        uuid: 'd77489a5d3fe4846b24d4ecfc3aa9344',
        address: '惠景和园三期-塔吊1',
        imei: '4f845f980a8b48a5b0c0d1204fb4c0bb'
      },
      {
        uuid: '66b627633ae24bfda50ad3c8eeb5d25c',
        address: '惠景和园三期-大门',
        imei: '66b627633ae24bfda50ad3c8eeb5d25c'
      },
      {
        uuid: '5ee82ca87983479cb1ca72391919e7e3',
        address: '惠景和园三期-生活区',
        imei: '9a03620c39654858bb77b1622e49ca89'
      },
      // 惠景嘉园
      {
        uuid: 'f4824e950d7145a681c9a30c44f361c4',
        address: '惠景嘉园-大门1',
        imei: 'f4824e950d7145a681c9a30c44f361c4'
      },
      {
        uuid: '54c9eaa6972f4c58b90eb5d5845f06a8',
        address: '惠景嘉园-大门2',
        imei: '54c9eaa6972f4c58b90eb5d5845f06a8'
      },
      {
        uuid: 'f7790d54c4724dbe8a97aa855bda81fb',
        address: '惠景嘉园-塔吊',
        imei: 'f7790d54c4724dbe8a97aa855bda81fb'
      },
      // 海岸新寓
      {
        uuid: 'e45c9cc068dc42c4964ee51dd4e53328',
        address: '海岸新寓-大门',
        imei: 'e7c345dbab3e4341ab6dee037cadb5b3'
      },
      {
        uuid: 'f7dacbfdfd754f2a87dafc2e29d2be0a',
        address: '海岸新寓-1号塔吊',
        imei: '4ed93e9283ea474a8c9eba4ce0ea473c'
      },
      {
        uuid: '870c288224754e409174ab4a9232b6a3',
        address: '海岸新寓-2号塔吊',
        imei: '6136b24fc88943d9895b234ab4d324df'
      },
      {
        uuid: '3e2ebfbe725448e68958291e00ace573',
        address: '海岸新寓-3号塔吊左',
        imei: '7265e99e13814ca7af72d6107994ec13'
      },
      {
        uuid: '7fc93f725eb54ac792cbc5a4a7e6e622',
        address: '海岸新寓-3号塔吊右',
        imei: 'cfd865b1ddc94f709f685ad7917b04d7'
      },
      // 创新发展大厦
      {
        uuid: 'd4d10ee15a4444df99edda4c451d25c8',
        address: '创新发展大厦-前门',
        imei: 'd4d10ee15a4444df99edda4c451d25c8'
      },
      {
        uuid: 'acb516e2c7dd4854bc38cd311d2eb0b0',
        address: '创新发展大厦-办公区',
        imei: 'acb516e2c7dd4854bc38cd311d2eb0b0'
      },
      {
        uuid: 'b54a1c56a8ae4152807f61e23e112536',
        address: '创新发展大厦-1号塔吊2',
        imei: 'b54a1c56a8ae4152807f61e23e112536'
      },
      {
        uuid: '8b5c3a373c29490dba927d116ef53795',
        address: '创新发展大厦-1号塔吊1',
        imei: '8b5c3a373c29490dba927d116ef53795'
      },
      {
        uuid: 'e47b225633184ef4aa8d1be7079fbe3f',
        address: '创新发展大厦-2号塔吊1',
        imei: 'e47b225633184ef4aa8d1be7079fbe3f'
      },
      {
        uuid: '123094a15455401ea814eb0e8aca6ac0',
        address: '创新发展大厦-2号塔吊2',
        imei: '123094a15455401ea814eb0e8aca6ac0'
      },
      // 银坑工地
      {
        uuid: '8caf61dc7bd54702828ba4f333232360',
        address: '银坑工地大门',
        imei: '37c718fcee9b4d21b71372a479735f7e'
      },
      {
        uuid: '8a4a279328804c5fb2a8125904852e17',
        address: '银坑工地塔吊4左',
        imei: 'b9702375018a43278e0ed86eeef45769'
      },
      {
        uuid: '300f6f1049a84c8dbcc82021f952a5e7',
        address: '银坑工地塔吊4右',
        imei: '83807a0613c4458faf6383d438619fdb'
      },
      {
        uuid: '147d8baabb154c28b7737337b362fc7f',
        address: '银坑工地塔吊2右',
        imei: 'd74d881bed4b4a88b09d75335dd2edab'
      },
      {
        uuid: '45e1bcc90cc9483793b8961ee633d349',
        address: '银坑工地塔吊2左',
        imei: '121a78b4a14d43abb8a8fbb2b6303f09'
      }
    ]
  }

  match(imei) {
    const uuid = this.uuidList.filter(item => item.imei === imei)
    return uuid.length > 0 ? uuid[0].uuid : ''
  }
}

export default new MatchUUID()
