// 摄像头UUID跟imei匹配
class MatchUUID {
  constructor() {
    this.uuidList = [
      // 惠景慧园
      {
        uuid: 'd52ef1c486394c7fa5159b4eb374d4fc',
        address: '惠景慧园4-1单元大堂',
        imei: '21024125409SLB000873'
      },
      {
        uuid: '5a481c8114ea4abe89f89c4dce67f82c',
        address: '惠景慧园4-2单元大堂',
        imei: '21024125409SLB000464'
      },
      {
        uuid: 'e7c3c6f3abd14405b5d827c3a5e0f0aa',
        address: '惠景慧园4-1后门高抛2-9楼',
        imei: '21024125049SLB000450'
      },
      {
        uuid: '04659a88ceac4383921ed20f0c843b00',
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
        uuid: '352804f300c74aebbb510657de723054',
        address: '惠景慧园4-2后门高抛10-22楼',
        imei: '21024125049SLB000466'
      },
      {
        uuid: 'ae1d0ce3fba0447394e3f89404e767f5',
        address: '惠景慧园5-1后门高抛2-9楼',
        imei: '21024125049SLB000455'
      },
      {
        uuid: '849c083910d942d085c2376010f5f6be',
        address: '惠景慧园4-2后门高抛2-9楼',
        imei: '21024125049SLB000454'
      },
      {
        uuid: 'be32792cb00d430886dc0d6880df2a28',
        address: '惠景慧园6栋大堂',
        imei: '21024125409SLB000434'
      },
      {
        uuid: 'd9c47619b71848ecbfd748a8f7edfb2a',
        address: '惠景慧园7栋大堂',
        imei: '21024125409SLB000558'
      },
      {
        uuid: '6671a7c23f214b56accafc72c6d4c62f',
        address: '惠景慧园1栋大堂',
        imei: '21024125409SLB000955'
      },
      {
        uuid: '570ec62340f24b7099106ff57235c56c',
        address: '惠景慧园2栋大堂',
        imei: '21024125409SLB000904'
      },
      {
        uuid: '992fe0e4339d4e0fa620968344734631',
        address: '惠景慧园5栋2单元大堂',
        imei: '21024125409SLB000828'
      },
      {
        uuid: '0dced3678c184ee2b87fc3a9af8da7b4',
        address: '惠景慧园5栋1单元大堂',
        imei: '21024125409SLB000820'
      },
      {
        uuid: 'a7b24951469d4cb893168761f8da0f72',
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
        uuid: '244fc21fc60c41a981797304b7bcf569',
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
        uuid: '34f7347c91eb4104b3d20ef12db64982',
        address: '港湾大道出入口',
        imei: '2102352KCPWMLC002463'
      },
      {
        uuid: '09c090c544e344888a91f9e673c1fb06',
        address: '港1出口',
        imei: '2102352KCPWMLC002560'
      },
      {
        uuid: 'd7e2094c10174d0198a0596b9629c7b7',
        address: '纳睿达出入口',
        imei: '2102353PHXWMM2000142'
      },
      {
        uuid: '5bb486f583ff4a209a68806667d22185',
        address: '湾6门前停车场围墙B',
        imei: '2102352KCPWMLC002604'
      },
      {
        uuid: '22db1da0095f4ff8b44cf3e7ce88532d',
        address: '1号公馆大堂门前围墙',
        imei: '2102353PJCWMM1000418'
      },
      {
        uuid: '82f8206c80be4d1cb3cb50439e0f5a34',
        address: '湾6门前停车场围墙C',
        imei: '2102353PJCWMM1000003'
      },
      {
        uuid: '5bb486f583ff4a209a68806667d22185',
        address: '湾6门前停车场立杆（消防围墙边）B',
        imei: '2102353PJCWMM1000288'
      },
      {
        uuid: '91b58e8c871145a79f594bc92d4c6367',
        address: '湾9门前停车位A',
        imei: '2102353PJCWMM1000270'
      },
      {
        uuid: 'e848d2c40ab74df3a2cf13a893aed7ae',
        address: '湾8门前停车位转角A',
        imei: '2102353PJCWMM1000358'
      },
      {
        uuid: '4417f1d006464c88b20b5c7632478e19',
        address: '湾9门前停车位B',
        imei: '2102353PJCWMM1000407'
      },
      {
        uuid: '08cd2c4c7ead48f8af744bcea25f00b2',
        address: '湾8门前停车位转角B',
        imei: '2102353PJCWMM1000481'
      },
      {
        uuid: '2d61ed6b0bc44f82a2d208f3de928d9c',
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
        uuid: 'cd04f4cc9bb24e65850d3b67cd1e7fea',
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
        uuid: '3902606c2a924ae793cb4d36821b9148',
        address: '1号公馆高点特写',
        imei: '2102412551LTLC000342'
      },
      {
        uuid: '910cf3c8c118437aac6ce0a1905fd78d',
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
        uuid: '4348f5e0a7b3418db77c2bb043290f49',
        address: '唐一工地后门态势',
        imei: '2102412464WLL4005199'
      },
      {
        uuid: '44a110c890eb4fb1bd8245e432e6d9ca',
        address: '唐一工地生活区态势A',
        imei: '2102412464WLL4005189'
      },
      {
        uuid: '513d137407dc422db54611047042ea59',
        address: '唐一工地正门安全帽',
        imei: '2102352KCPWMLC002545'
      },
      {
        uuid: 'd950c2f793d846568fa05754dff2e3f5',
        address: '唐一工地后门安全帽',
        imei: '2102352KCPWMLC002473'
      },
      {
        uuid: '6684e54d7d384c629715804e0593bd57',
        address: '唐一工地生活区态势B',
        imei: '2102412464WLL4005194'
      },
      // 金发工业
      {
        uuid: '1eba2d8e2995428cb7adc893f726e99b',
        address: '金发工地围墙高点态势',
        imei: '2102412464WLL4005201'
      },
      {
        uuid: '1866c6745fe64ed98cca524b84b7b1a8',
        address: '金发工地后门态势',
        imei: '2102352KCPWMLC002454'
      },
      {
        uuid: '84c3e8fadfcd426388ae673dc859e558',
        address: '金发工地后门安全帽',
        imei: '2102412464WLL4011010'
      },
      {
        uuid: 'd1bb9a37b8454132aa41137bafc69881',
        address: '金发工地正门态势',
        imei: '2102412024LTLA000743'
      },
      {
        uuid: '34bc6e6efaba4db0ab7f5b3f366ae139',
        address: '金发工地正门安全帽',
        imei: '2102352KCPWMLC002413'
      }
    ]
  }

  match(imei) {
    const uuid = this.uuidList.filter(item => item.imei === imei)
    return uuid.length > 0 ? uuid[0].uuid : ''
  }
}

export default new MatchUUID()
