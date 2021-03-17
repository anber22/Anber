// 摄像头UUID跟imei匹配
class MatchUUID {
  constructor() {
    this.uuidList = [
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
        uuid: '84a0c362aa4744a499f4264e442295e7',
        address: '湾区8栋后门违停监测',
        imei: '2102352KCPWMLC002408'
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
        uuid: 'cd04f4cc9bb24e65850d3b67cd1e7fea',
        address: '湾区10栋后门违停监测',
        imei: '2102412024LTLA000365'
      },
      {
        uuid: '1da2d20615ca40a3beef403c18da4fd9',
        address: '湾区9栋后门违停监测',
        imei: '2102352KCPWMLC002408'
      },
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
      {
        uuid: '558228fec8194e33a497270efdb532c9',
        address: '创意云端楼顶A广角',
        imei: '2102412551LTLC000241'
      },
      {
        uuid: 'db1fad682e50480ab5380cf0c0a496f3',
        address: '创意云端楼顶A特写',
        imei: '2102412551LTLC000241'
      },
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
