class JobAPI {
    private collector = {} as CollectorJob;
    
    public setParametrJobCollector(
        bankLevel: 0 | 1 | 2 | 3, 
        routeLocation: 'Santos' | 'Sandy' | 'Paleto' | 'None', 
        routeIndex: number, 
        pointIndex: number, 
        leaderId: number
    ) {
        this.collector.bankLevel = bankLevel;
        this.collector.routeLocation = routeLocation;
        this.collector.routeIndex = routeIndex;
        this.collector.pointIndex = pointIndex;
        this.collector.leader = leaderId;
    }

    public getPlayerToWork(player: PlayerMp, status: boolean, name: string) {
        player.isOnWork = status;
        player.isJob = name;
    }
}

const jobApi = new JobAPI();

export default jobApi;