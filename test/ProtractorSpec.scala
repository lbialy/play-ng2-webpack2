import org.scalatestplus.play.{OneServerPerSuite, PlaySpec}
import play.api.libs.ws.WSClient

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.io.Source._
import scala.sys.process.{Process, ProcessIO}

class ProtractorSpec extends PlaySpec with OneServerPerSuite {

  "my application" should {

    "pass the protractor tests" in {
      val baseUrl = s"http://localhost:$port/"
      val wsClient = app.injector.instanceOf[WSClient]

      val resp = Await.result(wsClient.url(baseUrl).get(), 2.seconds)
      resp.status must be(200)

      println(s"Executing protractor using command: 'npm run play-e2e -- --baseUrl $baseUrl")

      runProtractorTests(baseUrl) must be(0)
    }

  }

  private def runProtractorTests(baseUrl: String): Int = {
    Process(s"npm run play-e2e -- --baseUrl $baseUrl", app.getFile("ui"))
      .run(pipingInputAndOutput)
      .exitValue()
  }

  private def pipingInputAndOutput = new ProcessIO(_ => (),
    stdout => fromInputStream(stdout).getLines().foreach(println),
    stderr => fromInputStream(stderr).getLines().foreach(println)
  )

}